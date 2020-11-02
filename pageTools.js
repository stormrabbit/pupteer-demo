const puppeteer = require('puppeteer');
const {
    fsTools
} = require('eschew-materials');
const getUrlByIndex = (index) => `https://www.3dmgame.com/gl/3781708${index === 1 ? '' :`_${index}`}.html`;

const buildGetResult = async (page) =>  async (getResult)=> {
    await page.evaluate(() => {
        
        const filter = getResult()

        const getArrsInnerText = (arrs) => {
            let str = '';
            for (let idx = 0; idx < arrs.length; idx++) {
                const targetText = arrs.item(idx).innerText;
                if(!!targetText) {
                    str += `${targetText}\n`
                }
            }
            return str;
        }

        const ps = document.getElementsByClassName('news_warp_center')[0].getElementsByTagName('p');
        const pageStr = filter(ps);

        var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
   

        request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            if (request.readyState === 4) { // 成功完成
                // 判断响应结果:
                if (request.status === 200) {
                    // 成功，通过responseText拿到响应的文本:
                    return console.log(request.responseText);
                } else {
                    // 失败，根据响应码判断失败原因:
                    return console.log(request.status);
                }
            } else {
                // HTTP请求还在继续...
            }
        }

        // 发送请求:
        request.open('POST', 'somewhere', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(`${pageStr}`);
    });
}
const buildPage =async (url , getResult, setResult) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const result = '';
    await page.goto(url);
    page.on('request', async req => {
        const target =req._postData;
        result += target;
    } )

    await getResult(page);
    await page.evaluate(() => {
        

        const getArrsInnerText = (arrs) => {
            let str = '';
            for (let idx = 0; idx < arrs.length; idx++) {
                const targetText = arrs.item(idx).innerText;
                if(!!targetText) {
                    str += `${targetText}\n`
                }
            }
            return str;
        }

        var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象
        const ps = document.getElementsByClassName('news_warp_center')[0].getElementsByTagName('p');
        const pageStr = getArrsInnerText(ps);

        request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            if (request.readyState === 4) { // 成功完成
                // 判断响应结果:
                if (request.status === 200) {
                    // 成功，通过responseText拿到响应的文本:
                    return console.log(request.responseText);
                } else {
                    // 失败，根据响应码判断失败原因:
                    return console.log(request.status);
                }
            } else {
                // HTTP请求还在继续...
            }
        }

        // 发送请求:
        request.open('POST', 'somewhere', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(`${pageStr}`);
    });
    setResult(result);
    await browser.close();
}

export {
    buildPage
}

buildPage(getUrlByIndex())();
async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let result = '';

    const getResult = async (index) => {
        await page.goto(getUrlByIndex(index));
        page.on('request', async req => {
            const target = (req._postData + '').replace(/url.*=/g, '');
            if(!result.includes(target) && !!target) {
                console.log(target);
                result += target;
            }
        } )

        await page.evaluate(() => {
            var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

            const getArrsInnerText = (arrs) => {
                let str = '';
                for (let idx = 0; idx < arrs.length; idx++) {
                    const targetText = arrs.item(idx).innerText;
                    if(!!targetText) {
                        str += `${targetText}\n`
                    }
                }
                return str;
            }
            const ps = document.getElementsByClassName('news_warp_center')[0].getElementsByTagName('p');
            const pageStr = getArrsInnerText(ps);

            request.onreadystatechange = function () { // 状态发生变化时，函数被回调
                if (request.readyState === 4) { // 成功完成
                    // 判断响应结果:
                    if (request.status === 200) {
                        // 成功，通过responseText拿到响应的文本:
                        return console.log(request.responseText);
                    } else {
                        // 失败，根据响应码判断失败原因:
                        return console.log(request.status);
                    }
                } else {
                    // HTTP请求还在继续...
                }
            }

            // 发送请求:
            request.open('POST', 'somewhere', true);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(`${pageStr}`);
        });
    }
    // await getResult(1)
    for (let index = 1; index < 80; index++) {
        await getResult(index)
    }
    await fsTools.writeFilePlus('test.txt', result);
    await browser.close();
}