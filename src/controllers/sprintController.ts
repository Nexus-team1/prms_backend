import { Request, Response } from "express";
import prisma from "../models/prisma";

export const createSprint = async (req: Request, res: Response) => {
  const { name, startDate, endDate, projectId } = req.body;
  if (!name || !startDate || !endDate || !projectId) {
    return res
      .status(400)
      .json({
        message: "name, startDate, endDate, and projectId are required",
      });
  }
  try {
    const sprint = await prisma.sprint.create({
      data: { name, startDate, endDate, projectId },
      include: { tasks: true, project: true },
    });
    res.status(201).json(sprint);
  } catch (err) {
    res.status(500).json({ message: "Failed to create sprint", error: err });
  }
};

export const getSprints = async (req: Request, res: Response) => {
  try {
    const sprints = await prisma.sprint.findMany({
      include: { tasks: true, project: true },
    });
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sprints", error: err });
  }
};

export const getSprintById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sprint = await prisma.sprint.findUnique({
      where: { id: Number(id) },
      include: { tasks: true, project: true },
    });
    if (!sprint) return res.status(404).json({ message: "Sprint not found" });
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sprint", error: err });
  }
};

export const updateSprint = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, startDate, endDate, projectId } = req.body;
  try {
    const sprint = await prisma.sprint.update({
      where: { id: Number(id) },
      data: { name, startDate, endDate, projectId },
      include: { tasks: true, project: true },
    });
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ message: "Failed to update sprint", error: err });
  }
};

export const deleteSprint = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.sprint.delete({ where: { id: Number(id) } });
    res.json({ message: "Sprint deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete sprint", error: err });
  }
};
