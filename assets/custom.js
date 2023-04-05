$(document).ready(async () => {
  $(".add_to_card_btn").addClass("shown");
  $(document).on("click", async () => {
    $(".add_to_card_btn").addClass("shown");
  });

  $(".item_info__just_once").on("click", async function (e) {
    e.stopPropagation();
    const items_multy_toggle = $(this).prev().find(".items-toggle");
    items_multy_toggle.prop("checked", !items_multy_toggle.prop("checked"));
    const price = $(this)
      .parent()
      .parent()
      .find(".add_to_card_btn")
      .attr("price");
    const btn = $(this).parent().parent().find(".add_to_card_btn");
    if (items_multy_toggle.prop("checked")) {
      $(this).text("Pack");
      btn.text(`Add to card - ${price.slice(0, 1) + price.slice(1) * 3}.00`);
    } else {
      $(this).text("Just once");
      btn.text(`Add to card - ${price}`);
    }
  });

  $(".add_to_card_btn").on("click", async function () {
    const pack = 3;
    const prod_qty = $(this).prev().find(".items-toggle").prop("checked")
      ? pack
      : 1;
    const prod_id = parseInt($(this).parent().attr("data-id"));
    const data = {
      items: [
        {
          quantity: prod_qty,
          id: prod_id,
        },
      ],
    };
    const response = await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("response", response);
    location.reload();
  });
});
