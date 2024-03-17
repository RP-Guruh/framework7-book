<script>
  import { each } from "dom7";
  import {
    Page,
    Link,
    Toolbar,
    Searchbar,
    Button,
    BlockTitle,
    Block,
    Sheet,
    List,
    ListItem,
    Toggle
  } from "framework7-svelte";
  import cover_default from "../assets/images/cover_default.jpeg";
  import CategoryList from "../components/category-list.svelte";
  import { onMount } from "svelte";
  let numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  import store from "../js/store";

  let appKey = store.state.appKey;
  let dataBukuTemp = [];
  let dataBooks = [];
  onMount(async function () {
    await bestSellingBook();
  });

  async function bestSellingBook() {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${appKey}`
      );
      const data = await response.json();
      dataBooks = await Promise.all(
        data.results.map(async (buku) => {
          const author = buku.author;
          const title = buku.title;
          const description = buku.description;
          const contributor = buku.contributor;
          const publisher = buku.publisher;
          const isbns = buku.isbns?.map((isbn) => isbn.isbn13) || [];
          const rankings = buku.ranks_history?.map((rank) => rank.rank) || [];
          const bookCover = await getBookCover(title, author);
          return {
            author,
            title,
            description,
            contributor,
            publisher,
            isbns,
            rankings,
            bookCover,
          };
        })
      );
      //  console.log(dataBooks);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBookCover(title, author) {
    try {
      const encodedTitle = encodeURIComponent(title);
      const encodedAuthor = encodeURIComponent(author);
      const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.bookcover.longitood.com/bookcover?book_title=${encodedTitle}&author_name=${encodedAuthor}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
</script>

<Page name="home">
  <div
    class="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden relative flex"
  >
    <div class="bg-white h-full w-full px-5 pt-6 pb-20">
      <div class="mb-3">
        <h1 class="text-3xl font-bold">Hello Guruh</h1>
        <p class="text-sm text-gray-500 uppercase font-bold">
          THURSDAY 6 AUGUST
        </p>
      </div>

      <CategoryList />

      <div
        class="mt-16 w-96 h-12 py-2.5 justify-start items-center gap-8 inline-flex"
      >
        <div
          class="w-64 h-7 text-indigo-950 text-lg font-bold font-['Plus Jakarta Sans']"
        >
          Best selling books
        </div>
      </div>

      <!-- SLIDER BOOK DISINI -->

      <swiper-container
        class="demo-swiper-multiple"
        space-between={5}
        slides-per-view={1.5}
      >
        {#each dataBooks as book}
          <swiper-slide>
            <div
              class="relative mt-2 mb-10 flex w-52 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <a
                class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                href="/a"
              >
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img
                  class="object-cover"
                  src={cover_default}
                  alt="product image"
                />

                <span
                  class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"
                  >39% OFF</span
                >
              </a>
              <div class="mt-4 px-5 pb-5">
                <a href="/a">
                  <h5 class="text-xs tracking-tight text-slate-900">
                    {book.author}
                  </h5>
                  <span class="font-semibold text-sm tracking-wide text-black"
                    >{book.title}</span
                  >
                </a>
                <div class="mt-2 flex items-center justify-between">
                  <p>
                    <span class="text-xl font-bold text-slate-900"
                      >IDR 145.000</span
                    >
                  </p>
                </div>
                <div class="-mt-8 flex items-center justify-between">
                  <p>
                    <span class="text-sm text-slate-900 line-through"
                      >IDR 200.000</span
                    >
                  </p>
                </div>

                <div class="flex items-center -mt-2 mb-4">
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <span
                    class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"
                    >5.0</span
                  >
                </div>
                <Link
                  sheetOpen=".demo-sheet-swipe-to-step"
                  class="flex pl-2 items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart</Link
                >
              </div>
            </div>
          </swiper-slide>
        {/each}
      </swiper-container>

      <Sheet
      class="demo-sheet-swipe-to-step"
      style="height: auto"
      swipeToClose
      swipeToStep
      push
      backdrop
    >
      <div class="swipe-handler" on:click={() => toggleSwipeStep()} />
      <div class="sheet-modal-swipe-step">
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b>$500</b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <Button large fill>Make Payment</Button>
          <div class="margin-top text-align-center">Swipe up for more details</div>
        </div>
      </div>
      <BlockTitle medium class="margin-top">Your order:</BlockTitle>
      <List>
        <ListItem title="Item 1"><b slot="after">$200</b></ListItem>
        <ListItem title="Item 2"><b slot="after">$180</b></ListItem>
        <ListItem title="Delivery"><b slot="after">$120</b></ListItem>
      </List>
    </Sheet>
      <!-- END -->

      <div class="flex -mx-1 mb-5">
        <div class="w-1/2 px-1">
          <Link
            href="/a"
            class="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
            style="background: url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          >
            <div class="h-24"></div>
            <h3 class="text-lg font-bold text-white leading-tight">
              DJ Dan Spins The Wheels
            </h3>
          </Link>
          <a
            href="/a"
            class="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
            style="background: url(https://images.unsplash.com/photo-1534329539061-64caeb388c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          >
            <div class="h-32"></div>
            <h3 class="text-lg font-bold text-white leading-tight">
              Top Travels Destinations For 2020
            </h3>
          </a>
        </div>
        <div class="w-1/2 px-1">
          <a
            href="/a"
            class="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
            style="background: url(https://images.unsplash.com/photo-1526661934280-676cef25bc9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          >
            <div class="h-32"></div>
            <h3 class="text-lg font-bold text-white leading-tight">
              M&S Launches New Makeup Range!
            </h3>
          </a>
          <a
            href="/a"
            class="block mb-2 p-5 rounded overflow-hidden transform transition-all duration-300 scale-100 hover:scale-95"
            style="background: url(https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          >
            <div class="h-24"></div>
            <h3 class="text-lg font-bold text-white leading-tight">
              APT Set To Be A&nbsp;Ripper
            </h3>
          </a>
        </div>
      </div>
      <div class="mb-3">
        <h1 class="text-3xl font-bold">Previous</h1>
      </div>
      <div>
        <a
          href="/a"
          class="flex w-full transform transition-all duration-300 scale-100 hover:scale-95"
        >
          <div
            class="block h-24 w-2/5 rounded overflow-hidden"
            style="background: url(https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          ></div>
          <div class="pl-3 w-3/5">
            <p class="text-xs text-gray-500 uppercase font-semibold">SPORTS</p>
            <h3 class="text-md font-semibold leading-tight mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h3>
            <div
              class="flex w-full items-center text-xs text-gray-500 font-medium"
            >
              <div
                class="rounded-full w-5 h-5 mr-3"
                style="background: url(https://randomuser.me/api/portraits/men/41.jpg) center; background-size: cover;"
              ></div>
              <div>Jack Ryan</div>
            </div>
          </div>
        </a>
      </div>
      <hr class="border-gray-200 my-3" />
      <div>
        <a
          href="/a"
          class="flex w-full transform transition-all duration-300 scale-100 hover:scale-95"
        >
          <div
            class="block h-24 w-2/5 rounded overflow-hidden"
            style="background: url(https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          ></div>
          <div class="pl-3 w-3/5">
            <p class="text-xs text-gray-500 uppercase font-semibold">ART</p>
            <h3 class="text-md font-semibold leading-tight mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h3>
            <div
              class="flex w-full items-center text-xs text-gray-500 font-medium"
            >
              <div
                class="rounded-full w-5 h-5 mr-3"
                style="background: url(https://randomuser.me/api/portraits/men/63.jpg) center; background-size: cover;"
              ></div>
              <div>Kevin Jackson</div>
            </div>
          </div>
        </a>
      </div>
      <hr class="border-gray-200 my-3" />
      <div>
        <a
          href="/a"
          class="flex w-full transform transition-all duration-300 scale-100 hover:scale-95"
        >
          <div
            class="block h-24 w-2/5 rounded overflow-hidden"
            style="background: url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          ></div>
          <div class="pl-3 w-3/5">
            <p class="text-xs text-gray-500 uppercase font-semibold">MUSIC</p>
            <h3 class="text-md font-semibold leading-tight mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h3>
            <div
              class="flex w-full items-center text-xs text-gray-500 font-medium"
            >
              <div
                class="rounded-full w-5 h-5 mr-3"
                style="background: url(https://randomuser.me/api/portraits/women/11.jpg) center; background-size: cover;"
              ></div>
              <div>Rowena Wheeler</div>
            </div>
          </div>
        </a>
      </div>
      <hr class="border-gray-200 my-3" />
      <div>
        <a
          href="/a"
          class="flex w-full transform transition-all duration-300 scale-100 hover:scale-95"
        >
          <div
            class="block h-24 w-2/5 rounded overflow-hidden"
            style="background: url(https://images.unsplash.com/photo-1511068797325-6083f0f872b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) center; background-size: cover;"
          ></div>
          <div class="pl-3 w-3/5">
            <p class="text-xs text-gray-500 uppercase font-semibold">WORLD</p>
            <h3 class="text-md font-semibold leading-tight mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h3>
            <div
              class="flex w-full items-center text-xs text-gray-500 font-medium"
            >
              <div
                class="rounded-full w-5 h-5 mr-3"
                style="background: url(https://randomuser.me/api/portraits/women/74.jpg) center; background-size: cover;"
              ></div>
              <div>Gwen Thomson</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <Toolbar tabbar icons position="bottom">
    <Link
      tabLink="#tab-1"
      tabLinkActive
      text="Tab 1"
      iconIos="f7:envelope_fill"
      iconMd="material:email"
    />
    <Link
      tabLink="#tab-2"
      text="Tab 2"
      iconIos="f7:calendar_fill"
      iconMd="material:today"
    />
    <Link
      tabLink="#tab-3"
      text="Tab 3"
      iconIos="f7:cloud_upload_fill"
      iconMd="material:file_upload"
    />
  </Toolbar>
</Page>
