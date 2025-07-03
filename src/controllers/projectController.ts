import { Request, Response } from "express";
import prisma from "../models/prisma";

export const createProject = async (req: Request, res: Response) => {
  const { name, description, status } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }
  try {
    const project = await prisma.project.create({
      data: { name, description, status },
      include: { tasks: true, sprints: true },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project", error: err });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true, sprints: true },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { tasks: true, sprints: true },
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch project", error: err });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: { name, description, status },
      include: { tasks: true, sprints: true },
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to update project", error: err });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err });
  }
};
