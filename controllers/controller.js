const { User, Report } = require("../models");
const { compPassword } = require("../middleware/bcrypt");
const { createToken } = require("../middleware/jwt");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async login(req, res, next) {
    try {
      let { username, password } = req.body;
      if (!username || !password)
        throw { name: "require", message: "email/password required" };

      let find = await User.findOne({ where: { username } });
      if (!find) throw { name: "wrong" };

      let compare = compPassword(password, find.password);
      if (!compare) throw { name: "wrong" };

      const payload = { id: find.id, role: find.role, username: find.username };
      const access_token = createToken(payload);

      res.status(200).json({ access_token, role: find.role });
    } catch (error) {
      next(error);
    }
  }

  static async googleOAuthCus(req, res, next) {
    try {
        console.log("masuk");
      const { token_google } = req.headers;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "google-OAuth",
          role: "user",
        },
        hooks: false,
      });
      const access_token = createToken({ id: user.id });
      res.status(200).json({
        id: user.id,
        access_token,
        username: user.username,
        role: "user",
      });
    } catch (error) {
        console.log(err);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let role = "user";

      let reg = await User.create({ username, email, password, role });
      res.status(201).json({ id: reg.id, username: reg.username });
    } catch (error) {
      next(error);
    }
  }

  static async fetchReport(req, res, next) {
    try {
      let data = await Report.findAll({ include: User });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchReportById(req, res, next) {
    try {
      let id = req.params.id;
      let data = await Report.findOne({ where: { id }, include: User });

      let loc = data.location;
      let APIkey = process.env.API_KEY;
      let date = data.createdAt.toISOString().substring(0, 10);

      let gethit = await axios({
        method: "GET",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc},ID/${date}?key=${APIkey}`,
      });

      let {
        tempmax,
        tempmin,
        humidity,
        windspeed,
        visibility,
        sunrise,
        sunset,
        conditions,
        description,
      } = gethit.data.days[0];

      let convert = (temp) => {
        let res = (5 / 9) * (temp - 32);
        return res.toFixed(1);
      };

      let suhumax = convert(tempmax);
      let suhumin = convert(tempmin);

      let survey = {
        date,
        tempmax: +suhumax,
        tempmin: +suhumin,
        humidity,
        windspeed,
        visibility,
        sunrise,
        sunset,
        conditions,
        description,
      };

      let lat = gethit.data.latitude;
      let long = gethit.data.longitude;

      let mapUrl = `https://maps.google.com/maps?q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

      res.status(200).json({ data, survey, mapUrl, long, lat });
    } catch (error) {
      next(error);
    }
  }

  static async createReport(req, res, next) {
    try {
      let UserId = req.user.id;
      let status = "pending";
      let { title, description, victim, location } = req.body;

      let data = await Report.create({
        title,
        description,
        victim,
        status,
        location,
        UserId,
      });
      res.status(201).json({ message: "success create report", data });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      let { status } = req.body;
      let id = req.params.id;
      let report = await Report.findOne({ where: { id } });
      let data = await report.update({ status });
      res
        .status(200)
        .json({ message: `success change status report with id ${id}`, data });
    } catch (error) {
      next(error);
    }
  }

  static async getSpirit(req, res, next) {
    try {
      let gethit = await axios({
        method: "GET",
        url: `https://type.fit/api/quotes`,
      });
      let random = Math.floor(Math.random() * 1000);
      res.status(200).json(gethit.data[random]);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReport(req, res, next) {
    try {
      let id = req.params.id;
      console.log(id);
      let del = await Report.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `Report with id ${id} has been removed` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
