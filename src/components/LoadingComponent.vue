<template>
  <div class="loader-container">
    <div class="loader">
      <span></span>
      <span ></span>
      <span ></span>
      <span ></span>
      <span></span>
      <span></span>
    </div>
    <div>Lade Daten...</div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent"
}
</script>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  gap: 20px;
}
.loader{
  display: flex;
  align-items: center;
}
/* Creating the dots */
span{
  height: 25px;
  width: 25px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #130b38;
  animation: loading 1s linear infinite;
}
/* Creating the loading animation*/
@keyframes loading {
  0%{
    transform: translateX(0);
  }
  25%{
    transform: translateX(15px);
  }
  50%{
    transform: translateX(-15px);
  }
  100%{
    transform: translateX(0);
  }

}

span:nth-child(1){
  animation-delay: 0.1s;
}
span:nth-child(2){
  animation-delay: 0.2s;
}
span:nth-child(3){
  animation-delay: 0.3s;
}
span:nth-child(4){
  animation-delay: 0.4s;
}
span:nth-child(5){
  animation-delay: 0.5s;
}
</style>