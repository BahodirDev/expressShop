const toCurrency = (price) => {
  return new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((c) => {
  c.textContent = toCurrency(c.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length) {
            const dynamicHtml = card.notebooks
              .map((c) => {
                return `
                <tr>
                  <td>${c.title}</td>
                  <td>${c.count}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id="${c.id}">Delete</button>
                  </td>
                </tr>
              `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHtml;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = `
              <div class="mt-100">
                <div class="row bascket">
                  <div class="col-md-12">
                    <div class="card bascket">
                      <div class="card-body cart">
                        <div class="col-sm-12 empty-cart-cls text-center">
                          <img
                            src="https://i.imgur.com/dCdflKN.png"
                            width="130"
                            height="130"
                            class="img-fluid mb-4 mr-3"
                          />
                          <h3><strong>Your Cart is Empty</strong></h3>
                          <h4>Add something to make me happy :)</h4>
                          <a
                            href="/notebooks"
                            class="btn btn-primary cart-btn-transform m-3"
                            data-abc="true"
                          >continue shopping</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }
        });
    }
  });
}

// main Page

const bookmarks = [
  {
    title: "Daily",
    links: [
      { name: "Inbox", url: "https://inbox.google.com" },
      { name: "GitHub", url: "https://github.com" },
      { name: "Drive", url: "https://drive.google.com" },
    ],
  },
  {
    title: "Media",
    links: [
      { name: "Youtube", url: "https://youtube.com" },
      { name: "Netflix", url: "https://netflix.com" },
      { name: "Crunchyroll", url: "https://crunchyroll.com" },
      {
        name: "Amazon Prime",
        url: "https://www.amazon.com/Amazon-Video",
      },
    ],
  },
  {
    title: "Reddit",
    links: [
      { name: "/r/overwatch", url: "https://reddit.com/r/overwatch" },
      {
        name: "/r/pcmasterrace",
        url: "https://reddit.com/r/pcmasterrace",
      },
      { name: "/r/me_irl", url: "https://reddit.com/r/me_irl" },
      {
        name: "/r/battlestations",
        url: "https://reddit.com/r/battlestations",
      },
      { name: "/r/unixporn", url: "https://reddit.com/r/unixporn" },
      { name: "/r/news", url: "https://reddit.com/r/news" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Twitter", url: "https://twitter.com" },
      { name: "Facebook", url: "https://facebook.com" },
    ],
  },
];
