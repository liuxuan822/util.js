// 1、JS打乱数组
function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

// JavaScript
// setTimeOut准时吗
// 不一定准时，只是时间到了放进事件队列里


//  2、JS ajax
//步骤一:创建异步对象
var ajax = new XMLHttpRequest();
//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
ajax.open('get','getStar.php?starName='+name);
//步骤三:发送请求
ajax.send();
//步骤四:注册事件 onreadystatechange 状态改变就会调用
ajax.onreadystatechange = function () {
if (ajax.readyState==4 &&ajax.status==200) {
    //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
　　　　console.log(ajax.responseText);//输入相应的内容
　　}
}


//  3、JS bind 实现
if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var self = this,                        // 保存原函数
        context = [].shift.call(arguments), // 保存需要绑定的this上下文
        args = [].slice.call(arguments);    // 剩余的参数转为数组
        return function () {                    // 返回一个新函数
            self.apply(context,[].concat.call(args, [].slice.call(arguments)));
        }
    }
}
Function.prototype.bind = function (...arg) {
    var self = this;
		var newArr = [...arg];                       // 保存原函数
    var context = newArr.shift(); // 保存需要绑定的this上下文
    return function (...arg2) {
				var arr = [...newArr];  
				Array.prototype.push.apply(arr,arg2)
				self.apply(context,arr);
    }
}


// 4、懒加载
let lazyImages = [...document.querySelectorAll('.lazy-image')]
let inAdvance = 300 // 自定义一个高度，当距离300px到达图片时加载
function lazyLoad() {
    lazyImages.forEach(image => {
        if (image.offsetTop < window.innerHeight + window.pageYOffset + inAdvance) { // 距离xxpx时加载图片
            image.src = image.dataset.src
            image.onload = () => image.classList.add('loaded')
        }
    })
    // if all loaded removeEventListener
}
lazyLoad()
window.addEventListener('scroll', _.throttle(lazyLoad, 16)) // 用到了lodash的节流函数
window.addEventListener('resize', _.throttle(lazyLoad, 16))


// 5、JS实现promise
function PromiseM(){
    this.status='pending';
    this.msg='';
    var process=arguments[0];
    var that=this;
    process(function(){
        that.status='resolve';
        that.msg=arguments[0];
    },function(){
        that.status='reject';     
        that.msg=arguments[0];           
    });
    return this;
}
PromiseM.prototype.then=function(){
    if(this.status=='resolve'){
        arguments[0](this.msg);
    }
    if(this.status=='reject'&&arguments[1]){
        arguments[1](this.msg);
    }
}


// 6、JS发布订阅模式
const event = {
    clientList: [],
    listen: function(key , fn) {
        if (this.clientListen[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function() {
        const key = Array.prototype.shift.call(arguments)
        const fns = this.clientList[key]
        if (!fns || fns.length === 0 ) {
            return false
        }
        for (let i = 0, fn ;fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    },
    remove : function(key , fn) {
        const fns = this.clientList[key]
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let l = fns.length - 1; l>=0; l--) {
                const _fn = fns[l]
                if ( _fn ===fn) {
                    fns.splice(l, 1)
                }
            }
        }
}
const installEvent = (obj) => {
    for (let i in event) {
        obj[i] = event[i]
    }
}


// 7、JSONP
var script = document.createElement('script');
  script.type = 'text/javascript';

  // 传参并指定回调执行函数为onBack
  script.src = 'http://www.domain-com:8080/login?user=admin&callback=onBack';
  document.head.appendChild(script);

  // 回调执行函数
  function onBack(res) {
      alert(JSON.stringify(res));
  }



// 8、JS 获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}



// 9、CSS无限旋转
@keyframes rotate{
    0%{
        transform: rotate(0);
      }
    50%{
    	transform:rotate(200deg);
    }
    100%{
         transform: rotate(0);
    	}
	}
 
.rotate{
    transition: 0.5s;
    transform-origin: 30px 30px;  
    animation: rotate 10s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
}



// 10、卡牌翻转
.wutai{
	position: relative;
	perspective: 800px;
	width: 220px;
	height: 292px;
	transform-style: preserve-3d;
}
#trans{
	position: absolute;
	width: 100%;
	height: 100%;
	transition: all 1s;
	transform-style: preserve-3d;
}
        .back{transform: rotateY(180deg);}
        .flip{transform: rotateY(180deg);}



// 11、display 有兼容性怎么办
.box{
    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex;         /* 新版本语法: Opera 12.1, Firefox 22+ */
}

.flex1 {  
    -webkit-box-flex: 1   /* OLD - iOS 6-, Safari 3.1-6 */  
    -moz-box-flex: 1;     /* OLD - Firefox 19- */              
    -webkit-flex: 1;      /* Chrome */  
    -ms-flex: 1           /* IE 10 */  
    flex: 1;              /* NEW, Spec - Opera 12.1, Firefox 20+ */
}


// 12、网络篇
get请求
对称加密和非对称加密区别
对称加密采用了对称密码编码技术，它的特点是文件加密和解密使用相同的密钥加密

也就是密钥也可以用作解密密钥，这种方法在密码学中叫做对称加密算法，对称加密算法使用起来简单快捷，密钥较短，且破译困难，除了数据加密标准（DES），另一个对称密钥加密系统是国际数据加密算法（IDEA），它比DES的加密性好，而且对计算机功能要求也没有那么高

与对称加密算法不同，非对称加密算法需要两个密钥：公开密钥（publickey）和私有密钥（privatekey）。

公开密钥与私有密钥是一对，如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密；如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密。因为加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法。

非对称加密算法实现机密信息交换的基本过程是：甲方生成一对密钥并将其中的一把作为公用密钥向其它方公开；得到该公用密钥的乙方使用该密钥对机密信息进行加密后再发送给甲方；甲方再用自己保存的另一把专用密钥对加密后的信息进行解密。甲方只能用其专用密钥解密由其公用密钥加密后的任何信息。

// 13、https和http的区别
HTTPS和HTTP的区别主要如下：

1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

HTTP与HTTPS的区别 - 爱笑的蛙蛙 - 博客园

https的缺点
虽然说HTTPS有很大的优势，但其相对来说，还是存在不足之处的：

（1）HTTPS协议握手阶段比较费时，会使页面的加载时间延长近50%，增加10%到20%的耗电；

（2）HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗，甚至已有的安全措施也会因此而受到影响；

（3）SSL证书需要钱，功能越强大的证书费用越高，个人网站、小网站没有必要一般不会用。

（4）SSL证书通常需要绑定IP，不能在同一IP上绑定多个域名，IPv4资源不可能支撑这个消耗。

（5）HTTPS协议的加密范围也比较有限，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用。最关键的，SSL证书的信用链体系并不安全，特别是在某些国家可以控制CA根证书的情况下，中间人攻击一样可行。

http option的作用
简而言之，OPTIONS请求方法的主要用途有两个：

1、获取服务器支持的HTTP请求方法；

2、用来检查服务器的性能。

其实在正式跨域之前，浏览器会根据需要发起一次预检（也就是option请求），用来让服务端返回允许的方法（如get、post），被跨域访问的Origin（来源或者域），还有是否需要Credentials(认证信息)等。

强缓存和协商缓存的缓存，是从哪里拿的？
http缓存

TCP与UDP的区别
1、TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接

2、TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
3、TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的
UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）4、每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
5、TCP首部开销20字节;UDP的首部开销小，只有8个字节

6、TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道

http2.0
HTTP 2.0与HTTP 1.1区别 - FrankYou - 博客园


// 算法
// 14、选择排序
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}


// 15、二分查找算法
function binarySearch(data,item,start,end){
    var end=end || data.length-1;
    var start=start || 0;
    var m=Math.floor((start+end)/2);
    if(item === data[m]){
        return m;
    }else if(item<data[m]){
        return binarySearch(data,item,start,m-1) //递归调用
    }else{
        return binarySearch(data,item,m+1,end);
    }
    return false;
}


// 16、归并算法
function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }

  return tmp.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1) 
    return a;

  var mid = ~~(a.length / 2)
    , left = a.slice(0, mid)
    , right = a.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}


// 17、快速排序
const quickSort = (arr) => {
	let left = 0;
	let right = arr.length - 1;
	whlie(left < right) {
		while(arr[right] >= arr[0] && left < right){
			right -= 1
		}
		while(arr[left] <= arr[0] && left < right) {
			left++;
		}
		if (right === left) {
      let mid=arr[right];
      arr[right]=arr[0];
      arr[0]=mid;
      break;
    }
		// 当左指针小于右指针的位置，交换两个指针当前位置的元素
    let tem=arr[right];
    arr[right]=arr[left];
    arr[left]=tem;
	}
	return quickSort(arr.slice(0,left)).concat(arr.slice(left,right+1)).concat(quickSort(arr.slice(right+1)));
}

function _quickSort(num, left, right) {
    if (left >= right) return; // 若左右指针相遇，待排序数组长度小宇1，即递归的终点，return(注意不能写成left==right，这里left是有可能大于right的)。
    var i = left, j = right, flag = left; // 定义可移动的左右指针 i，j，定义flag为基数下标。
    while (i < j) { // 在i<j时不断循环，i一旦与j碰头，则跳出循环。
        while (num[j] >= num[flag] && j > flag) j--; // j不断左移，找到在num[flag]右侧且比它大的数。
        if (i >= j) {
            break; // 由于j可能已被改变，需再次判断i与j是否碰头。
        }
        while (num[i] <= num[flag] && i < j) i++; // i不断右移，找到且比基数小的数，且i不能与j碰头。(由于两次交换已合并，此处不需要使得i在flag左侧)
        // num[flag] num[j] num[i]三者换位，可用ES6语法糖[num[flag],num[j],num[i]] = [num[j],num[i],num[flag]];
        let temp = num[flag]; 
        num[flag] = num[j];
        num[j] = num[i];
        num[i] = temp
        flag = i; // 基数已经在原num[i]的位置，flag同时也要赋值成i。
    }
    _quickSort(num, left, flag - 1); // 将flag左边数组作为待排序数组，递归调用。
    _quickSort(num, flag + 1, right); // 将flag右边数组作为待排序数组，递归调用。
}
// 18、回文算法
function palindrome(str) {
	var newstr = str.replace(/[^0-9a-z]/gi, ""); 
	newstr = newstr.toLowerCase();
	for (var i = 0, j = newstr.length - 1; i < j; i++, j--) { 
	    if (newstr.charAt(i) !== newstr.charAt(j)) 
	    { 
	        return false; //逐个字符比较，不匹配返回false
	    } 
	} 
	return true;
}


// 19、节流函数
function throttle(method,delay,duration){
    var timer=null;
    var begin=new Date();    
    return function(){                
        var context=this, args=arguments;
        var current=new Date();        
        clearTimeout(timer);
        if(current-begin>=duration){
            method.apply(context,args);
            begin=current;
        }else{
            timer=setTimeout(function(){
                method.apply(context,args);
            },delay);
        }
    }
}

// 20、函数消抖
function debounce(method,context){
    clearTimeout(method.tId);
    method.tId=setTimeout(function(){
        method.call(context)
    },300)
}
function debounce(method,delay){
    var timer = null; 
    return function(){
        var context = this,args = arguments;
        clearTimeout(timer); 
        timer = setTimeout(function(){
            method.apply(context,args); 
        },delay);
    }
}

const throttle = (method, delay, duration) => {
	const date = new Date();
	let timer = null;
	return function (...arg){
		const current = new Date();
		clearTimeOut(timer);
		if(current - data >= duration){
			method.apply(this, arg);
			date = current;
		}
		timer = setTimeOut(() => {
			method.apply(this, arg);
		}, delay)
	}
}


// 21、IndexOf的实现
function ArrayIndexOf(arr,value,n){
    var i=isNaN(n)?0:n;//有第三参时
        i=(i<0)?arr.length+i:i;//第三参为负数时
    for(i;i<arr.length;i++){
        if(arr[i]===value){return i;}                   
    }return -1;
}