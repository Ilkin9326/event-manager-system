import { Component, computed, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItSupportService } from '@app/services/event/it-support-service';
import { ItSupportItem } from '@app/dto/ItSupportItem';

export interface SelectedItItem {
  isi_d: number;
  item_name: string;
  quantity: number | null;
}

@Component({
  selector: 'app-it-support-selector',
  imports: [CommonModule],
  templateUrl: './it-support-selector.html',
  styleUrl: './it-support-selector.scss'
})
export class ItSupportSelector {
  private itSupportService = inject(ItSupportService);

  items      = this.itSupportService.items;
  loading    = this.itSupportService.loading;
  categories = computed(() => this.itSupportService.categories);

  selectedItems: Map<number, SelectedItItem> = new Map();

  selectionChange = output<SelectedItItem[]>();

  ngOnInit(): void {
    this.itSupportService.loadItems();
  }

  onCheck(item: ItSupportItem, checked: boolean): void {
    if (checked) {
      this.selectedItems.set(item.isi_id, {
        isi_d: item.isi_id,
        item_name: item.item_name,
        quantity: null
      });
    } else {
      this.selectedItems.delete(item.isi_id);
    }
    this.emit();
  }

  onQuantity(item: ItSupportItem, value: string): void {
    const existing = this.selectedItems.get(item.isi_id);
    if (existing) {
      let qty = Number(value);
      if (qty < 1) qty = 1;
      if (qty > 50) qty = 50;
      existing.quantity = qty;
      this.emit();
    }
  }

  isChecked(isi_d: number): boolean {
    return this.selectedItems.has(isi_d);
  }

  clampValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);
    if (value < 1) input.value = '1';
    if (value > 50) input.value = '50';
  }

  private emit(): void {
    this.selectionChange.emit(Array.from(this.selectedItems.values()));
  }
}
