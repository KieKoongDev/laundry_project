<template>
  <div class="w-full flex flex-col items-center pb-20 xl:pb-0">
    <JoinLineGroup :currentDevice="getDevice()" />
    <div
      class="w-full max-w-xl flex justify-center gap-4 mb-4 px-2 md:px-0 mt-4"
    >
      <div
        class="bg-green-500 text-white flex items-center justify-center gap-3 px-3 py-2 rounded w-full"
      >
        <p class="text-xl font-bold">เครื่องที่ว่าง</p>
        <p class="text-3xl font-bold">{{ availableMachines }}</p>
      </div>
      <div
        class="bg-orange-500 text-white flex items-center justify-center gap-3 px-3 py-2 rounded w-full"
      >
        <p class="text-xl font-bold hidden md:inline">เครื่องที่กำลังใช้งาน</p>
        <p class="text-xl font-bold md:hidden">กำลังใช้งาน</p>
        <p class="text-3xl font-bold">{{ inUseMachines }}</p>
      </div>
    </div>
    <div
      class="flex flex-col lg:grid lg:grid-cols-2 px-2 lg:place-items-center items-center w-full lg:max-w-6xl gap-4"
    >
      <WashingMachine
        v-for="machine in machines"
        :key="machine.id"
        :machine="machine"
        @start="startCycle"
      />
    </div>
  </div>
</template>

<script>
import WashingMachine from '../components/WashingMachine.vue'
import JoinLineGroup from '../components/JoinLineGroup.vue'
import axios from 'axios'

export default {
  components: {
    WashingMachine,
    JoinLineGroup,
  },
  data() {
    return {
      machines: JSON.parse(localStorage.getItem('machines')) || [
        {
          id: 1,
          status: 'available',
          remainingTime: 0,
          weight: '10 kg.',
          price: 40,
          washingTime: 2,
        },
        {
          id: 2,
          status: 'available',
          remainingTime: 0,
          weight: '10 kg.',
          price: 40,
          washingTime: 2,
        },
        {
          id: 3,
          status: 'available',
          remainingTime: 0,
          weight: '10 kg.',
          price: 40,
          washingTime: 2,
        },
        {
          id: 4,
          status: 'available',
          remainingTime: 0,
          weight: '10 kg.',
          price: 40,
          washingTime: 2,
        },
        {
          id: 5,
          status: 'available',
          remainingTime: 0,
          weight: '15 kg.',
          price: 50,
          washingTime: 3,
        },
        {
          id: 6,
          status: 'available',
          remainingTime: 0,
          weight: '15 kg.',
          price: 50,
          washingTime: 3,
        },
      ],
    }
  },
  computed: {
    availableMachines() {
      return (
        this.machines.filter(machine => machine.status === 'available')
          ?.length || 0
      )
    },
    inUseMachines() {
      return (
        this.machines.filter(machine => machine.status === 'in-use')?.length ||
        0
      )
    },
  },
  mounted() {
    this.getDevice()
    this.updateMachines()
    this.machines.forEach(machine => {
      if (machine.status === 'in-use') {
        this.updateRemainingTime(machine)
        if (machine.remainingTime > 0) {
          this.countdown(machine)
        } else {
          machine.status = 'available'
          machine.remainingTime = 0
          machine.startTime = null
          machine.endTime = null
          machine.notified = false
          this.saveMachines()
        }
      }
    })
  },
  methods: {
    getDevice() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera

      // Check if it's a mobile device
      if (/android/i.test(userAgent)) {
        return 'Android'
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS'
      }

      // Check screen size for tablets (you can adjust these values as needed)
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024
      if (isTablet) {
        return 'Tablet'
      }

      // Default to desktop
      return 'Desktop'
    },
    updateMachines() {
      const historyMachines = JSON.parse(localStorage.getItem('machines'))
      if (historyMachines) {
        this.machines.forEach(machine => {
          machine.status = historyMachines.find(
            m => m.id === machine.id,
          )?.status
          machine.startTime = historyMachines.find(
            m => m.id === machine.id,
          )?.startTime
          machine.endTime = historyMachines.find(
            m => m.id === machine.id,
          )?.endTime
          machine.notified = historyMachines.find(
            m => m.id === machine.id,
          )?.notified
        })
        this.saveMachines()
      }
    },
    startCycle(machine) {
      Date.prototype.addMinutes = function (minutes) {
        this.setMinutes(this.getMinutes() + minutes)
        return this
      }
      machine.status = 'in-use'
      machine.remainingTime = machine.washingTime
      machine.startTime = new Date()
      machine.endTime = new Date().addMinutes(machine.washingTime)
      machine.notified = false
      this.saveMachines()
      this.countdown(machine)
    },
    updateRemainingTime(machine) {
      const currentTime = new Date().getTime()
      const endTime = new Date(machine.endTime).getTime()
      const remainingMinutes = Math.floor((endTime - currentTime) / 60000)
      machine.remainingTime = Math.max(remainingMinutes, 0)
      if (machine.remainingTime === 1 && !machine.notified) {
        this.notifyLineGroup(machine)
      }
      this.saveMachines()
    },
    countdown(machine) {
      const interval = setInterval(() => {
        machine.remainingTime -= 1
        if (machine.remainingTime <= 0) {
          clearInterval(interval)
          machine.status = 'available'
          this.saveMachines()
        }
        if (machine.remainingTime === 1 && !machine.notified) {
          this.notifyLineGroup(machine)
        }
        this.saveMachines()
      }, 60000)
    },
    async notifyLineGroup(machine) {
      const lineToken = 'fJpRS5dZt1KYdWZMPDMe6CO6nEv5O9Jg5CR2VAozKH8';
      await axios.post(
        'https://notify-api.line.me/api/notify',
        {
          message: `เครื่องที่ [${machine.id}] ใกล้เสร็จแล้ว! อีกประมาณ 1 นาที`,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${lineToken}`,
          },
        }
      )
      machine.notified = true
      this.saveMachines()
    },
    saveMachines() {
      localStorage.setItem('machines', JSON.stringify(this.machines))
    },
  },
}
</script>
