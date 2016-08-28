
// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
sleep(500).then(() => {
    // Do something after the sleep!
})
