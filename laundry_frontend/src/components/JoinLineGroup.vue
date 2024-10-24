<template>
  <div class="w-full px-4 md:px-0 max-w-sm flex justify-center gap-3 items-center xl:absolute xl:top-10 xl:right-10">
    <div class="flex flex-col gap-1 w-full">
      <p class="text-white text-xl">
        ติดตามสถานะเครื่องซักผ้าที่ไหนก็ได้ แค่เข้ากลุ่มไลน์
      </p>
      <a
      v-if="currentDevice !== 'Desktop'"
        href="https://line.me/ti/g/bSbNbOzCdI"
        target="_blank"
        class="bg-white px-4 py-2 rounded text-center"
      >
        เข้ากลุ่มไลน์
      </a>
    </div>
    <div class="">
      <img
        src="/src/assets/icons/line_group_qr.jpg"
        alt="line-group-qr"
        width="120"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinLineGroup',
  props: {
    currentDevice: {
      type: String,
      required: true,
    },
  },
}
</script>
