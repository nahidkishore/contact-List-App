const Contact = require("./Contact");

exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.render("index", {
        contacts,
        error: {},
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

exports.getSingleContact = (req, res) => {
  let { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

exports.createContact = (req, res) => {
  let { name, phone, email, id } = req.body;

  let error = {};

  if (!name) {
    error.name = "Please Provide A Name";
  }

  if (!phone) {
    error.phone = "Please Provide A Phone Number";
  }

  if (!email) {
    error.email = "Please Provide an Email";
  }

  let isError = Object.keys(error).length > 0;
  if (isError) {
    Contact.find()
      .then((contacts) => {
        return res.render("index", {
          contacts,
          error,
        });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          message: "Error Occurred",
        });
      });
  }

  if (id) {
    Contact.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    )
      .then(() => {
        Contact.find().then((contacts) => {
          res.render("index", { contacts, error: {} });
        });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          message: "Error Occurred",
        });
      });
  } else {
    let contact = new Contact({
      name,
      email,
      phone,
    });
    contact
      .save()
      .then((c) => {
        Contact.find().then((contacts) => {
          return res.render("index", {
            contacts,
            error: {},
          });
        });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          message: "Error Occurred",
        });
      });
  }
};

exports.updateContact = (req, res) => {
  let { name, email, phone } = req.body;
  let { id } = req.params;

  Contact.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
        phone,
      },
    },
    {
      new: true,
    }
  )
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};

exports.deleteContact = (req, res) => {
  let { id } = req.params;
  Contact.findOneAndDelete({
    _id: id,
  })
    .then(() => {
      Contact.find().then((contacts) => {
        res.render("index", {
          contacts,
          error: {},
        });
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occurred",
      });
    });
};
