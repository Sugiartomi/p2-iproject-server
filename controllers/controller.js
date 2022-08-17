const { User, Report } = require("../models");
const { compPassword } = require("../middleware/bcrypt");
const { createToken } = require("../middleware/jwt");

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

      res.status(200).json({ access_token });
    } catch (error) {
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
      let data = await Report.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchReportById(req, res, next) {
    try {
      let id = req.params.id;
      let data = await Report.findByPk(id);
      res.status(200).json(data);
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
        let { status } = req.body
        let id = req.params.id
        let report = await Report.findOne({ where : {id}})
        let data = await report.update({status})
        res.status(200).json({message :`success change status report with id ${id}`, data})
    } catch (error) {
        next(error)
    }
  }
}

module.exports = Controller;
