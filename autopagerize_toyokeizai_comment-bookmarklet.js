javascript: (() => {
{
    const sleep_time = 500;
    const getElementsByXPath = (expression, parentElement) => {
        const r = [];
        const x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0, l = x.snapshotLength; i < l; i++) {
            r.push(x.snapshotItem(i));
        }
        return r;
    };
    const getJsonUrls = () => {
        const page_urls = getElementsByXPath('//span[@class="page"]/a[@href]').map(a => a.href);
        let mat = page_urls[0].match(/comment\/(\d+)\?page=(\d+)&sort=(.*)/);
        if (!mat || mat[2] !== "2") {
            console.error("page starting not 2");
            return [];
        }
        mat = page_urls[page_urls.length - 1].match(/comment\/(\d+)\?page=(\d+)&sort=(.*)/);
        const articleid = mat[1], max_page = mat[2], sortorder = mat[3];
        let urls = [];
        for (let pagenum = 2; pagenum <= max_page; pagenum++) {
            urls.push(`https://toyokeizai.net/hfds/comment/pages.json?article_id=${articleid}&page=${pagenum}&sort=${sortorder}`);
        }
        return urls;
    };
    const getJson2 = (txt, json_urls) => {
        const txt2 = txt.replace(/^{"list":"/, "").replace(/",".*/, "").replace(/\\"/g, '"');
        const parser = new DOMParser();
        const doc = parser.parseFromString(txt2, "text/html");
        const ul = doc.getElementsByTagName("ul")[0];
        document.getElementById("mw-comment-container").insertAdjacentElement('beforeend', ul);
        setTimeout(() => getJson(json_urls), sleep_time);
    };
    const getJson = (json_urls) => {
        if (!json_urls.length) return;
        const url = json_urls.shift();
        console.log("fetch " + url);
        fetch(url).then((res) => res.text()).then(t => getJson2(t, json_urls));
    };
    const json_urls = getJsonUrls();
    getJson(json_urls);
}
})()
