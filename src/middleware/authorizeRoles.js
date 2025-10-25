export default function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: "Forbidden: rol no autorizado" });
    }
    next();
  };
}