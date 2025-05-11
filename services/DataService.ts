import { createHash } from "node:crypto";
import { default_ } from "../config/data.js";
import type { DataInterface } from "../types/DataInterface.js";
import { FileSystem } from "../utils/FileSystem.js";

interface SavedDataEntry {
  password: string;
  size: number;
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export class DataService implements DataInterface {
  private loadData(): SavedDataEntry[] {
    try {
      const rawData = FileSystem.read(default_.path);
      const parsedData = JSON.parse(rawData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch {
      return [];
    }
  }

  private saveData(data: SavedDataEntry[]): void {
    FileSystem.write(default_.path, JSON.stringify(data));
  }

  public save(entry: { password: string; size: number }): void {
    const data = this.loadData();
    const hashedPassword = hashPassword(entry.password);

    data.push({ password: hashedPassword, size: entry.size });
    this.saveData(data);
  }

  public async reset(): Promise<void> {
    this.saveData([]);
  }

  public verify(password: string): number {
    const data = this.loadData();
    const hashedPassword = hashPassword(password);

    const match = data.find((entry) => entry.password === hashedPassword);
    return match ? match.size : -1;
  }
}
