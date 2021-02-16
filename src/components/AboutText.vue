<template>
  <section>
     <h1>
       Meetup is about connecting people with something in common. While the connections begin online, the real memories are made at events. Meetup events are real-life gatherings where members and organizers get together to connect, discuss, and practice activities related to their shared interests.
      </h1>
   
    <footer>
      <img src="../assets/Meetup.png" alt="" />
    </footer>
  </section>
</template>

<script>
export default {
  name: "AboutText",
};
</script>

<style scoped>
.bold {
  -webkit-text-stroke: medium;
}

p {
  text-align: justify;
}

/*aligning footer in th middle*/
footer {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

h1,
h3,
p {
  color: #3d2f27;
}

h3 {
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
}

.role {
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
}
</style>