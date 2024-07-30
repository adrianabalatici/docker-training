import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  private tasks: Task[] = [];

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // const task: Task = {
    //   id: uuidv4(),
    //   ...createTaskDto,
    //   status: 'pending'
    // };
    // this.tasks.push(task);
    // return task;
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return existingTask;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
