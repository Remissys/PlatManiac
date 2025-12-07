export function getBanner() {
    
    var banners = [
        "../assets/banners/black_banner.jpg",
        "../assets/banners/blue_banner.jpg",
        "../assets/banners/green_banner.jpg",
        "../assets/banners/red_banner.jpg",
        "../assets/banners/white_banner.jpg"
    ]

    var banner = banners[Math.floor(Math.random()*banners.length)]

    return banner
}

// console.log(getBanner())