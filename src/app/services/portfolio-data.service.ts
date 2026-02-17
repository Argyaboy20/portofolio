import { Injectable } from '@angular/core';

export interface Tool {
  name: string;
  icon: string;
  category: 'programmer' | 'data-analyst';
  level: 'Advanced' | 'Intermediate' | 'Basic';
  isTechStack: boolean;
}

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  private _tools: Tool[] = [];
  private _projectsCount: number = 0;

  // Dipanggil dari Tab1Page saat ngOnInit
  setTools(tools: Tool[]) {
    this._tools = tools;
  }

  setProjectsCount(count: number) {
    this._projectsCount = count;
  }

  getTechStackCount(): number {
    return this._tools.filter(t => t.isTechStack).length;
  }

  getProjectsCount(): number {
    return this._projectsCount;
  }

  getCodingYears(): number {
    return Math.floor(new Date().getFullYear() - 2024);
  }
}