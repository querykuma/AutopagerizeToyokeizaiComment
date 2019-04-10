javascript: (() => {
    const start_page = 1;
    const page_times = 4;
    const comment_num = 50;
    const frame_height = "8000px";
    const sleep_time = 1000;
    const insertFrame = (times, page, baseNode) => {
        if (times <= 0) return;
        const frameURL = `https://news.yahoo.co.jp/comment/plugin/v1/full/?origin=https://headlines.yahoo.co.jp&sort=${baseNode.getAttribute('data-sort')}&order=${baseNode.getAttribute('data-order')}&page=${page}&type=t&keys=${baseNode.getAttribute('data-keys')}&full_page_url=${baseNode.getAttribute('data-full-page-url')}&comment_num=${baseNode.getAttribute('data-comment-num')}`;
        const frameNew = `<iframe class="news-comment-plguin-iframe" scrolling="yes" frameborder="0" src="${frameURL}" style="width: 100%; height: ${frame_height}; border: none;"></iframe>`;
        baseNode.insertAdjacentHTML('beforeend', frameNew);
        setTimeout(() => { insertFrame(times - 1, page + 1, baseNode) }, sleep_time);
    };
    const replaceFrame = () => {
        const iframes = document.querySelectorAll("iframe.news-comment-plguin-iframe");
        const baseNode = iframes[0].parentNode;
        if (baseNode.getAttribute("data-page-type") !== "full") return;
        iframes.forEach(iframe => baseNode.removeChild(iframe));
        baseNode.setAttribute("data-comment-num", comment_num);
        insertFrame(page_times, start_page, baseNode);
    };
    replaceFrame();
})()
