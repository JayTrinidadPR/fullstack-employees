import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

const router = express.Router();

function isInvalidEmployeePayload(body) {
  return (
    body === undefined ||
    body.name === undefined ||
    body.birthday === undefined ||
    body.salary === undefined ||
    Number.isNaN(Number(body.salary))
  );
}

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (isInvalidEmployeePayload(req.body)) {
      return res.sendStatus(400);
    }

    const employee = await createEmployee(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);

    if (employee === undefined) {
      return res.sendStatus(404);
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedEmployee = await deleteEmployee(req.params.id);

    if (deletedEmployee === undefined) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (isInvalidEmployeePayload(req.body)) {
      return res.sendStatus(400);
    }

    const employee = await updateEmployee({ id: req.params.id, ...req.body });

    if (employee === undefined) {
      return res.sendStatus(404);
    }

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

export default router;
