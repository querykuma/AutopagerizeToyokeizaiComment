javascript: (() => {
    const start_page = 1;
    const page_times = 4;
    const comment_num = 50;
    const frame_height = "8000px";
    const sleep_time = 1000;
    const insertFrame = (times, page, baseNode) => {
        if (times <= 0) return;
        const frameURL = `https://news.yahoo.co.jp/comment/plugin/v1/full/?origin=https://news.yahoo.co.jp&sort=lost_points&order=desc&page=${page}&type=t&topic_id=${baseNode.dataset.topicId}&space_id=${baseNode.dataset.spaceId}&content_id={baseNode.dataset.content_id}&full_page_url=${baseNode.dataset.fullPageUrl}&comment_num=${baseNode.dataset.commentNum}&flt=${baseNode.dataset.flt}&mtestid=${baseNode.dataset.mtestid}`;
        const frameNew = `<iframe class="news-comment-plguin-iframe" scrolling="yes" frameborder="0" src="${frameURL}" style="width: 100%; height: ${frame_height}; border: none;"></iframe>`;
        console.log(frameURL);
        baseNode.insertAdjacentHTML('beforeend', frameNew);
        setTimeout(() => { insertFrame(times - 1, page + 1, baseNode); }, sleep_time);
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
})();
