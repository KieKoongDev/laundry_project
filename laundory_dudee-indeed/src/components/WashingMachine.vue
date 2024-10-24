<template>
    <div :class="['rounded-lg p-4 w-full max-w-md md:max-w-xl flex justify-center', machine.status === 'available' ? 'bg-white' : 'bg-white/80']">
      <div class="w-full flex flex-col md:flex-row justify-between">
        <div class="flex justify-center md:justify-start gap-10 md:gap-8">
          <div v-if="machine.status === 'in-use'" class="machine-run shadow-xl border-2"></div>
          <div v-else class="machine-stop shadow-xl border-2"></div>
          <div class="flex flex-col gap-2">
            <p class="text-2xl font-bold">เครื่องที่<span :class="['ml-2 rounded-full px-2.5 text-white', machine.status === 'available' ? 'bg-green-500' : 'bg-orange-500']">{{ machine.id }}</span></p>
            <p class="text-xl"><span class="md:inline">น้ำหนักผ้า</span> < {{ machine.weight }}</p>
            <p class="text-2xl font-bold"><span class=" md:inline">ราคา</span> {{ machine.price }} บาท</p>
          </div>
        </div>
        <div class="flex md:flex-col gap-2 items-center justify-between md:justify-start mt-4 md:mt-0">
          <div class="flex md:flex-col gap-4 md:gap-2 items-center w-full justify-center md:justify-start">
            <p v-if="machine.status === 'in-use'" class="text-2xl text-center text-orange-500 font-bold hidden md:inline">กำลังใช้งาน</p>
            <p v-if="machine.status === 'available'" class="text-2xl text-center font-bold text-green-500 hidden md:inline">ว่าง</p>
            <div v-if="machine.remainingTime > 0" class="w-6 h-6 self-center my-1">
              <img src="/src/assets/icons/hourglass.png" alt="icon" class="w-full h-full object-cover" />
            </div>
            <p v-if="machine.remainingTime === 0" class="md:hidden">ประมาณ : </p>
            <p v-if="machine.remainingTime > 0" class="text-xl text-center"><span class="hidden md:inline">เหลือเวลา : </span>{{ machine.remainingTime }} นาที</p>
            <p v-if="machine.remainingTime === 0" class="text-xl text-center"><span class="hidden md:inline">เวลาซัก : </span>{{ machine.washingTime }} นาที</p>
          </div>
          <div class="w-full">
            <button v-if="machine.status === 'available'" @click="startMachine" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-xl">$ หยอดเหรียญ</button>
            <p v-if="machine.status === 'in-use'" class="min-w-fit w-full">เสร็จประมาณ : {{ new Date(machine.endTime)?.toLocaleTimeString('th')?.slice(0,-3) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    props: ['machine'],
    methods: {
      startMachine() {
        this.$emit('start', this.machine);
      }
    },
    components: {
      
    }
  };
  </script>

  <style scoped>
  .machine-run {
    width: 120px;
    height: 150px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-image: linear-gradient(#ddd 50%, #bbb 51%),
      linear-gradient(#ddd, #ddd), linear-gradient(#ddd, #ddd),
      radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
      radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
      radial-gradient(ellipse at center, #e80606 25%, #eee 26%, #eee 50%, #0000 55%);
    background-position: 0 20px, 45px 0, 8px 6px, 55px 3px, 75px 3px, 95px 3px;
    background-size: 100% 4px, 1px 23px, 30px 8px, 15px 15px, 15px 15px, 15px 15px;
    position: relative;
    border-radius: 6%;
    animation: shake 3s ease-in-out infinite;
    transform-origin: 60px 180px;
  }
  .machine-run:before {
    content: "";
    position: absolute;
    left: 5px;
    top: 100%;
    width: 7px;
    height: 5px;
    background: #aaa;
    border-radius: 0 0 4px 4px;
    box-shadow: 102px 0 #aaa;
  }
  
  .machine-run:after {
    content: "";
    position: absolute;
    width: 95px;
    height: 95px;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20px;
    background-color: #bbdefb;
    background-image: 
      linear-gradient( to right, #0004 0%, #0004 49%, #0000 50%, #0000 100% ),
      linear-gradient(135deg, #64b5f6 50%, #607d8b 51%);
    background-size: 30px 100%, 90px 80px;
    border-radius: 50%;
    background-repeat: repeat, no-repeat;
    background-position: 0 0;
    box-sizing: border-box;
    border: 10px solid #DDD;
    box-shadow: 0 0 0 4px #999 inset, 0 0 6px 6px #0004 inset;
    animation: spin 3s ease-in-out infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg) }
    50% { transform: rotate(360deg) }
    75% { transform: rotate(750deg) }
    100% { transform: rotate(1800deg) }
  }
  @keyframes shake {
    65%, 80%, 88%, 96% { transform: rotate(0.5deg) }
    50%, 75%, 84%, 92% { transform: rotate(-0.5deg) }
    0%, 50%, 100%  { transform: rotate(0) }
  }

  .machine-stop {
    width: 120px;
    height: 150px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-image: linear-gradient(#ddd 50%, #bbb 51%),
      linear-gradient(#ddd, #ddd), linear-gradient(#ddd, #ddd),
      radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
      radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
      radial-gradient(ellipse at center, #09dc3a 25%, #eee 26%, #eee 50%, #0000 55%);
    background-position: 0 20px, 45px 0, 8px 6px, 55px 3px, 75px 3px, 95px 3px;
    background-size: 100% 4px, 1px 23px, 30px 8px, 15px 15px, 15px 15px, 15px 15px;
    position: relative;
    border-radius: 6%;
    
    transform-origin: 60px 180px;
  }
  .machine-stop:before {
    content: "";
    position: absolute;
    left: 5px;
    top: 100%;
    width: 7px;
    height: 5px;
    background: #aaa;
    border-radius: 0 0 4px 4px;
    box-shadow: 102px 0 #aaa;
  }
  
  .machine-stop:after {
    content: "";
    position: absolute;
    width: 95px;
    height: 95px;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20px;
    background-color: #d6d7d8;
    
    background-size: 30px 100%, 90px 80px;
    border-radius: 50%;
    background-repeat: repeat, no-repeat;
    background-position: 0 0;
    box-sizing: border-box;
    border: 10px solid #DDD;
    box-shadow: 0 0 0 4px #999 inset, 0 0 6px 6px #0004 inset;
  }
</style>