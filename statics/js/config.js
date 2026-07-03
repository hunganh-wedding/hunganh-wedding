/* =========================================================
   EDIT WEDDING DETAILS HERE
   Changes to this file update the static invitation after deploy.
   ========================================================= */

window.WEDDING_CONFIG = {
  couple: {
    groom: {
      fullName: "Lê Quang Hưng",
      displayName: "Quang Hưng",
      parents: {
        father: "",
        mother: "Trần Thu Hồng"
      }
    },
    bride: {
      fullName: "Đoàn Minh Anh",
      displayName: "Minh Anh",
      parents: {
        father: "Đoàn Văn Thành",
        mother: "Nguyễn Thị Ngọc Anh"
      }
    }
  },

  story: {
    fromYear: "2016",
    toYear: "2026",
    sideTextLeft: "10 years gone. No refund.",
    sideTextRight: "A decade down, still not tired of each other."
  },

  wedding: {
    date: "2026-07-12",
    lunarDate: "Ngày 28 tháng 05 năm Bính Ngọ",
    mainTime: "09:00",
    dayLabel: "Chủ Nhật",
    countdownTime: "09:00"
  },

  events: [
    {
      id: "groom",
      title: "Lễ Thành Hôn",
      hostLabel: "Nhà Trai",
      time: "09:00",
      date: "2026-07-12",
      lunarDate: "Ngày 28 tháng 05 năm Bính Ngọ",
      place: "Tư gia nhà trai",
      address: "Số 23 ngõ 506 Bạch Mai, Bạch Mai, Hà Nội",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=S%E1%BB%91%2023%20ng%C3%B5%20506%20B%E1%BA%A1ch%20Mai%2C%20H%C3%A0%20N%E1%BB%99i",
      mapEmbedUrl: "https://www.google.com/maps?q=S%E1%BB%91%2023%20ng%C3%B5%20506%20B%E1%BA%A1ch%20Mai%2C%20B%E1%BA%A1ch%20Mai%2C%20H%C3%A0%20N%E1%BB%99i&output=embed"
    },
    {
      id: "bride",
      title: "Tiệc Mừng Lễ Thành Hôn",
      hostLabel: "Nhà Gái",
      time: "11:00",
      date: "2026-07-12",
      lunarDate: "Ngày 14 tháng 10 năm Bính Ngọ",
      place: "TTTC Trống Đồng",
      address: "Số 2 Lãng Yên, Hồng Hà, Hà Nội",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Tr%E1%BB%91ng%20%C4%90%E1%BB%93ng%20S%E1%BB%91%202%20L%C3%A3ng%20Y%C3%AAn%2C%20H%C3%A0%20N%E1%BB%99i",
      mapEmbedUrl: "https://www.google.com/maps?q=TTTC%20Tr%E1%BB%91ng%20%C4%90%E1%BB%93ng%2C%20S%E1%BB%91%202%20L%C3%A3ng%20Y%C3%AAn%2C%20H%E1%BB%93ng%20H%C3%A0%2C%20H%C3%A0%20N%E1%BB%99i&output=embed"
    }
  ],

  schedule: [
    {
      time: "09:00",
      date: "12.07.2026",
      title: "Lễ thành hôn tại tư gia nhà trai",
      note: "Số 23 ngõ 506 Bạch Mai, Bạch Mai, Hà Nội"
    },
    {
      time: "11:00",
      date: "12.07.2026",
      title: "Tiệc mừng lễ thành hôn",
      note: "TTTC Trống Đồng, Số 2 Lãng Yên, Hồng Hà, Hà Nội"
    }
  ],

  music: {
    enabledByDefault: true,
    volume: 0.58,
    src: "statics/audio/All You Need Is Love.mp3"
  },

  page: {
    title: "Thiệp cưới Quang Hưng & Minh Anh",
    description: "Trân trọng kính mời bạn tới dự lễ thành hôn của Quang Hưng và Minh Anh.",
    inviteLine: "Trân trọng kính mời",
    formalLine: "Tới dự tiệc mừng lễ thành hôn của hai con chúng tôi",
    closingLine: "Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi."
  }
};
