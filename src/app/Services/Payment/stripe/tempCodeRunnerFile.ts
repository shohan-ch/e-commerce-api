   let saleItems = this.items.map((item: any) => {
      return {
        price_data: {
          currency: "bdt",
          product_data: {
            name: item.name,
          },
          unit_amount: item.quantityPrice,
        },
        quantity: item.quantity,
      };
    });