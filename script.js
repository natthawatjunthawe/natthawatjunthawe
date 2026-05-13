document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderStories(data.stories);
            renderGallery(data.gallery);
            renderVideos(data.videos);
            renderSocials(data.socials);

            // เมื่อเรนเดอร์รูปภาพเสร็จแล้ว ให้เรียกใช้งาน Swiper Slider
            new Swiper(".mySwiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 20,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        })
        .catch(error => console.error('Error loading data:', error));

    // แก้ไข: สร้างโครงสร้าง HTML ให้ตรงกับที่คุณเขียนไว้ใน style.css
    function renderStories(stories) {
        const container = document.getElementById('story-container');
        stories.forEach(story => {
            const storyItem = document.createElement('div');
            storyItem.className = 'story-item';
            storyItem.innerHTML = `
                <div class="story-img">
                    <img src="${story.image}" alt="${story.title}">
                </div>
                <div class="story-text">
                    <h3>${story.title}</h3>
                    <p>${story.content}</p>
                </div>
            `;
            container.appendChild(storyItem);
        });
    }

    // แก้ไข: เปลี่ยน class ให้เป็น swiper-slide เพื่อให้ Swiper ทำงานได้
    function renderGallery(gallery) {
        const container = document.getElementById('gallery-container');
        gallery.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'swiper-slide';
            galleryItem.innerHTML = `
                <img src="${item.url}" alt="${item.caption}">
                <div class="slide-caption">${item.caption}</div>
            `;
            // ผูก Event ให้กดแล้วเปิด Lightbox รูปใหญ่
            galleryItem.addEventListener('click', () => openLightbox(item.url));
            container.appendChild(galleryItem);
        });
    }

    function renderVideos(videos) {
        const container = document.getElementById('video-container');
        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerHTML = `
                <iframe src="${video.url}" allowfullscreen></iframe>
            `;
            container.appendChild(videoItem);
        });
    }

    function renderSocials(socials) {
        const container = document.getElementById('social-container');
        socials.forEach(social => {
            const link = document.createElement('a');
            link.href = social.link;
            link.target = "_blank";
            link.innerHTML = `<i class="${social.icon}"></i>`;
            container.appendChild(link);
        });
    }

    // ระบบ Lightbox (อัลบั้มรูป)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    function openLightbox(imgUrl) {
        lightbox.style.display = "flex"; // ใช้ flex ให้รูปอยู่ตรงกลาง
        lightboxImg.src = imgUrl;
    }

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', (e) => {
        // ปิดเมื่อคลิกพื้นที่รอบนอกรูปภาพ
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});