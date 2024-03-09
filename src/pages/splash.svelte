<script>
  import {
    Page,
    BlockTitle,
    BlockFooter,
    Button,
    List,
    ListInput,
    Sheet,
    PageContent,
    Link,
    Icon,
    useStore,
    f7,
  } from "framework7-svelte";

  import { onMount, afterUpdate } from "svelte";
  import store from "../js/store";
  import splash1 from "../assets/images/splash.jpg";
  import splash2 from "../assets/images/splash2.jpg";
  import splash3 from "../assets/images/splash3.jpg";
  import splash4 from "../assets/images/splash4.jpg";

  let isOpen = useStore("isOpen", (value) => (isOpen = value));

  /* 
    bekerja saat isOpen bernilai true
    default nya adalah false
    true terjadi saat user kembali dari halaman register ke halaman splash
    dalam timeout waktu 100ms sheet dengan class tersebut akan di buka 
  */

  onMount(async () => {
    if (isOpen == true) {
      const interval = setTimeout(() => {
        f7.sheet.open(".demo-sheet-swipe-to-close", true);
      }, 100);
    }
  });

  let email = "";
  let password = "";
  let notificationPasswordError;

  let SwiperGroup = [
    {
      text: "Discover New",
      subText: "Fashion",
      picture: splash1,
    },
    {
      text: "Explore Your",
      subText: "Talent",
      picture: splash2,
    },
    {
      text: "Imagine Your",
      subText: "Style",
      picture: splash3,
    },
    {
      text: "Only in",
      subText: "Zalora",
      picture: splash4,
    },
  ];

  // Kumpulan function dibawah sini

  function loginDialog() {

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#$%^&*()_=+[\]{}|\\;:'",.<>/?]).*$/;
    const isValid = pattern.test(password);
    if (!isValid) {
      notificationPasswordError = f7.notification.create({
        title: '<span class="text-red-700 font-bold">Invalid password!</span>',
        titleRightText: 'now',
        text: 'Pastikan password Anda mengandung setidaknya satu angka, satu huruf kecil, satu huruf kapital, dan satu simbol.',
        closeTimeout: 2000,
      });
      notificationPasswordError.open();
    } else {
      f7.dialog.alert(`Email: ${email}<br>Password: ${password}`);
    }
  }
  // End
</script>

<Page class="grid grid-flow-row auto-rows-max overflow-scroll">

  <swiper-container
    pagination={true}
    class="demo-swiper-multiple"
    space-between={5}
  >
    {#each SwiperGroup as item}
      <swiper-slide>
        <div>
          <img src={item.picture} class="rounded-b-2xl" alt="not found" />
        </div>
        <div>
          <BlockFooter>
            <span class="text-3xl font-thin text-black flex justify-center">
              {item.text}
              {item.subText}
            </span>
          </BlockFooter>
        </div>
      </swiper-slide>
    {/each}
  </swiper-container>

  <div class="flex justify-center buttonStarted lg:mb-4 mb-4 lg:mt-20 mt-10">
    <Button
      raised
      fill
      color="black"
      class="w-44"
      largeIos
      sheetOpen=".demo-sheet-swipe-to-close">Get Started</Button
    >
  </div>

  <Sheet
    class="demo-sheet-swipe-to-close"
    style="height: auto"
    swipeToClose
    push
    backdrop
  >
    <div class="swipe-handler" />
    <PageContent>
      <BlockTitle large>Welcome Back!</BlockTitle>
      <div class="-mt-8">
        <BlockTitle small>Enter Your Email & Password</BlockTitle>
      </div>
      <List strongIos dividersIos insetIos>
        <ListInput
          label="E-mail"
          type="email"
          placeholder="Your e-mail"
          clearButton
          onInput={(e) => (email = e.target.value)}
          value={email}
          required 
          validate
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
          clearButton
          onInput={(e) => (password = e.target.value)}
          value={password}
          required 
          validate
          minlength=3
          info="Minimal 3 karakter, gabungan angka,huruf,simbol,dan kapital"
        />
        <div class="mt-8 justify-center">
          <Button
            textColor="white"
            borderColor="#545454"
            bgColor="black"
            largeIos
            tonal
            onClick={loginDialog}>Login</Button
          >
        </div>
        <div class="flex mt-2 text-sm font-medium justify-center">
          <Link
            sheetClose=".demo-sheet-swipe-to-close"
            href="/register"
            text="Create New Account"
            color="blue"
          ></Link>
        </div>
      </List>
    </PageContent>
  </Sheet>
</Page>

<style>
  span {
    font-family: "Playfair Display", serif;
  }
</style>
