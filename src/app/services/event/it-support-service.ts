import { inject, Injectable, signal } from '@angular/core';
import { ItSupportItem } from '@app/dto/ItSupportItem';
import { HttpClient } from '@angular/common/http';


export type ItSupportGrouped = Record<string, ItSupportItem[]>;
export interface ItSupportResponse {
  data: ItSupportGrouped;
}

@Injectable({
  providedIn: 'root'
})
export class ItSupportService {
  private readonly http = inject(HttpClient);
  constructor() { }

  items = signal<ItSupportGrouped>({});
  loading = signal(false);
  error = signal<string | null>(null);

  loadItems(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<ItSupportResponse>('it-support').subscribe({
      next: (res) => {
        this.items.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  getByCategory(category: string): ItSupportItem[] {
    return this.items()[category] ?? [];
  }

  get categories(): string[] {
    return Object.keys(this.items());
  }

  get allItems(): ItSupportItem[] {
    return Object.values(this.items()).flat();
  }
}
