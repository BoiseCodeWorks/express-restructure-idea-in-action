const _ROLES = ["public", "admin", "super"]
let _role = "public"

function _hasRole(userRole) {
  return _ROLES.indexOf(_role) <= _ROLES.indexOf(userRole)
}

export class Authorize {
  static role(role) {
    _role = role
    return Authorize
  }
  static middleware(req, res, next) {
    try {
      if (!_hasRole(req.user ? req.user.role : "")) {
        throw new Error("Not Authorized")
      }
      next()
    } catch (error) { 
      error.status = 401
      next(error) 
    }
  }
}