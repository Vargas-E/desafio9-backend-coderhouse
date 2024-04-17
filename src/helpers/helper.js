const helper = {
  jsonStringify(object) {
    if (object == undefined) {
      return `null`;
    }
    return JSON.stringify(object);
  },
  assignAppbar(user) {
    return user.rol === "admin" ? 'appbar_admin' : 'appbar';
  }
};

module.exports = helper;
