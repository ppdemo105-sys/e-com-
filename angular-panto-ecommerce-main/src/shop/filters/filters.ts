import { Category } from '@/types/category.type';
import { ProductsFilters } from '@/types/filters.type';
import { Component, output } from '@angular/core';

type sortValue = Pick<ProductsFilters, 'sort'>;

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
  standalone: true,
})
export class Filters {
  // Sort
  sortFilters: { label: string; value: sortValue['sort'] }[] = [
    { label: 'Price Ascending', value: 'price_asc' },
    { label: 'Price Descending', value: 'price_desc' },
    { label: 'Name Ascending', value: 'name_asc' },
    { label: 'Name Descending', value: 'name_desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
  ];

  // Sort by Categories
  sortCategory: { label: string; value: Category }[] = [
    { label: 'Sofas', value: 'sofa' },
    { label: 'Chairs', value: 'chair' },
    { label: 'Stools', value: 'stool' },
    { label: 'Tables', value: 'table' },
    { label: 'Desks', value: 'desk' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Vanitory', value: 'vanitory' },
    { label: 'Matress', value: 'matress' },
    { label: 'Mirrors', value: 'mirror' },
    { label: 'Wardrove', value: 'wardrove' },
    { label: 'TV Table', value: 'tv table' },
    { label: 'Garden', value: 'garden' },
  ];

  /*
  - Output event
  - It emits an object to the parent (father) component (Shop) with the type and the value,
  - so the parent component can use them to filter and fetch the products.
  */
  filterChange = output<{ type: 'sort' | 'category'; value: string }>();

  /*
  - This function is called when the user changes the sort or category filter.
  - It also checks whether the event target is the sort or category filter by checking the name (ex. 'sortBy') and emits the event with the correct type and value.
  */
  onChange(event: Event) {
    const eventTarget = event.target as HTMLSelectElement;

    this.filterChange.emit({
      type: eventTarget.name === 'sortBy' ? 'sort' : 'category',
      value: eventTarget.value,
    });
  }
}
