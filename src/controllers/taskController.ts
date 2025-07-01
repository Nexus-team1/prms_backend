import { Request, Response } from "express";
import prisma from "../models/prisma";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, userId } = req.body;
  if (!title || !userId) {
    return res.status(400).json({ message: "Title and userId are required" });
  }
  try {
    const task = await prisma.task.create({
      data: { title, description, dueDate, userId },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task", error: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status, dueDate },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err });
  }
};

export const assignTaskToUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Get the task and its preferredRole
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task || !task.preferredRole) {
      return res
        .status(400)
        .json({ message: "Task or preferredRole not found" });
    }

    // Get all users with the preferred role and isActive
    const users = await prisma.user.findMany({
      where: {
        role: task.preferredRole,
        isActive: true,
      },
      orderBy: { id: "asc" },
    });
    if (!users.length) {
      return res
        .status(404)
        .json({ message: `No users with role ${task.preferredRole}` });
    }

    // Find the last assigned user for this role (by userId)
    const lastTask = await prisma.task.findFirst({
      where: {
        preferredRole: task.preferredRole,
        userId: { in: users.map((u) => u.id) },
        id: { lt: task.id },
      },
      orderBy: { id: "desc" },
    });

    let nextUser: (typeof users)[0];
    if (!lastTask) {
      // Assign to the first user if no previous assignment
      nextUser = users[0];
    } else {
      // Find the next user in rotation
      const lastIndex = users.findIndex((u) => u.id === lastTask.userId);
      nextUser = users[(lastIndex + 1) % users.length];
    }

    // Assign the task to the selected user
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { userId: nextUser.id },
    });

    res.json(updatedTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to assign task by rotation", error: err });
  }
};

export const getTasksByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: Number(id) },
    });
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user's tasks", error: err });
  }
};
