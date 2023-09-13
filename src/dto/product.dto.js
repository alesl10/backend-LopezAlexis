class ProductDTO {
  constructor (product) {
    this.title = product.title;
    this.description = product.description;
    this.code = product.code.replace(/\s/g, '').toLowerCase();
    this.price = product.price;
    this.status = true;
    this.stock = product.stock;
    this.category = product.category.toLowerCase();
  };
};

export default ProductDTO;