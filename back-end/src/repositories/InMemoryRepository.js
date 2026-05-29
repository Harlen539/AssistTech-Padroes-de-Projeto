export class InMemoryRepository {
  constructor(initialItems = []) {
    this.items = initialItems.map((item) => ({ ...item }));
  }

  findAll() {
    return this.items.map((item) => ({ ...item }));
  }

  findById(id) {
    const numericId = Number(id);
    const item = this.items.find((current) => Number(current.id) === numericId);
    return item ? { ...item } : null;
  }

  nextId() {
    return this.items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
  }

  create(data) {
    const item = { id: data.id ?? this.nextId(), ...data };
    this.items.unshift(item);
    return { ...item };
  }

  update(id, data) {
    const numericId = Number(id);
    const index = this.items.findIndex((item) => Number(item.id) === numericId);

    if (index < 0) {
      return null;
    }

    this.items[index] = { ...this.items[index], ...data, id: this.items[index].id };
    return { ...this.items[index] };
  }

  delete(id) {
    const numericId = Number(id);
    const before = this.items.length;
    this.items = this.items.filter((item) => Number(item.id) !== numericId);
    return this.items.length < before;
  }
}
