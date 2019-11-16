(this["webpackJsonptinder-react"]=this["webpackJsonptinder-react"]||[]).push([[0],{27:function(t,e,a){t.exports=a(39)},32:function(t,e,a){},33:function(t,e,a){},39:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),r=a(9),i=a.n(r),o=(a(32),a(10)),l=a(4),c=a(11),h=a(12),p=a(14),m=a(24),u=a.n(m),d=a(25),g=a.n(d),f=(a(33),a(53)),C=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).state={isPanning:!1},a}return Object(p.a)(e,t),Object(l.a)(e,[{key:"onPan",value:function(t){if(!this.state.isPanning){this.setState({isPanning:!0}),this.topCard.style.transition=null;var e=window.getComputedStyle(this.topCard).transform.match(/^matrix\((.+)\)$/);this.startPosX=e?parseFloat(e[1].split(", ")[4]):0,this.startPosY=e?parseFloat(e[1].split(", ")[5]):0}}},{key:"render",value:function(){return n.a.createElement("div",{className:"card",style:this.props.style},n.a.createElement("img",{src:this.props.person.img,alt:"profile"}),n.a.createElement("div",{className:"info"},n.a.createElement("span",null,this.props.person.name+"\u3001"+this.props.person.age)))}}]),e}(n.a.Component),k=a(15),v=a.n(k),P=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).stack=n.a.createRef(),a.stackLength=2,a.state={topCard:Object,nextCard:Object,hammer:null,isPanning:!1,startPosX:0,startPosY:0,topCardTransition:null,topCardTransform:null,nextCardTransition:null,nextCardTransform:null,isDraggingFrom:0,currentPeople:t.people.slice(-a.stackLength),currentIndex:t.people.length},a}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.handle()}},{key:"handle",value:function(){var t=this.stack.current.childNodes,e=t[t.length-1],a=t[t.length-2];if(this.setState({topCard:e,nextCard:a}),t.length>0){this.setState({topCardTransform:"translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)"}),this.state.hammer&&this.state.hammer.destroy();var s=new v.a(e);s.add(new v.a.Pan({position:v.a.position_ALL,threshold:0})),s.on("pan",this.onPan.bind(this)),this.setState({hammer:s})}}},{key:"onPan",value:function(t){var e=this;if(!this.state.isPanning){this.setState({isPanning:!0}),this.setState({topCardTransition:null}),this.state.nextCard&&this.setState({nextCardTransition:null});var a=window.getComputedStyle(this.state.topCard).transform.match(/^matrix\((.+)\)$/);this.setState({startPosX:a?parseFloat(a[1].split(", ")[4]):0}),this.setState({startPosY:a?parseFloat(a[1].split(", ")[5]):0});var s=this.state.topCard.getBoundingClientRect();this.setState({isDraggingFrom:t.center.y-s.top>this.state.topCard.clientHeight/2?-1:1})}var n=t.deltaX+this.state.startPosX,r=t.deltaY+this.state.startPosY,i=t.deltaX/this.stack.current.clientWidth,o=t.deltaX<0?-1:1,l=this.state.isDraggingFrom*o*Math.abs(i)*45,c=(95+5*Math.abs(i))/100;if(this.setState({topCardTransform:"translateX("+n+"px) translateY("+r+"px) rotate("+l+"deg)"}),this.state.nextCard&&this.setState({nextCardTransform:"translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale("+c+")"}),t.isFinal){var h=!1;this.setState({isPanning:!1}),this.setState({topCardTransition:"transform 200ms ease-out"}),this.state.nextCard&&this.setState({nextCardTransition:"transform 100ms linear"}),i>.25&&t.direction===v.a.DIRECTION_RIGHT?(h=!0,n=this.stack.current.clientWidth):i<-.25&&t.direction===v.a.DIRECTION_LEFT&&(h=!0,n=-(this.stack.current.clientWidth+this.state.topCard.clientWidth)),h?(this.setState({topCardTransform:"translateX("+n+"px) translateY("+r+"px) rotate("+l+"deg)"}),setTimeout((function(){e.postProcess()}),200)):(this.setState({topCardTransform:"translateX(-50%) translateY(-50%) rotate(0deg)"}),this.state.nextCard&&this.setState({nextCardTransform:"translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)"}))}}},{key:"postProcess",value:function(){this.setState({currentPeople:this.state.currentPeople.slice(0,-1),currentIndex:(this.state.currentIndex-1)%this.props.people.length,topCardTransform:"translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)",topCardTransition:null}),this.push(),this.handle()}},{key:"push",value:function(){this.state.currentIndex>1?this.setState({currentPeople:this.props.people.slice(this.state.currentIndex-this.stackLength,this.state.currentIndex)}):1===this.state.currentIndex?this.setState({currentPeople:[this.props.people[this.props.people.length-1],this.props.people[0]]}):0===this.state.currentIndex&&this.setState({currentPeople:this.props.people.slice(-2),currentIndex:this.props.people.length})}},{key:"like",value:function(){var t=this;this.setState({topCardTransition:"transform 200ms ease-out"});var e=this.stack.current.clientWidth;this.setState({topCardTransform:"translateX("+e+"px) translateY("+-250+"px) rotate(35deg)"}),setTimeout((function(){t.postProcess()}),200)}},{key:"nope",value:function(){var t=this;this.setState({topCardTransition:"transform 200ms ease-out"});var e=-(this.stack.current.clientWidth+this.state.topCard.clientWidth);this.setState({topCardTransform:"translateX("+e+"px) translateY("+-250+"px) rotate(35deg)"}),setTimeout((function(){t.postProcess()}),200)}},{key:"render",value:function(){return n.a.createElement("div",{className:"stack",ref:this.stack},this.state.currentPeople.length>2&&this.state.currentPeople.slice(0,-2).reverse().map((function(t){return n.a.createElement(C,{className:"card",person:t})})),this.state.currentPeople.length>1&&n.a.createElement(C,{className:"card",style:{transition:this.state.nextCardTransition,transform:this.state.nextCardTransform},person:this.state.currentPeople[this.state.currentPeople.length-2]}),this.state.currentPeople.length>0&&n.a.createElement(C,{className:"card",style:{transition:this.state.topCardTransition,transform:this.state.topCardTransform},person:this.state.currentPeople[this.state.currentPeople.length-1]}))}}]),e}(n.a.Component),x=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).people=[{name:"Linda",age:25,img:"https://i.imgur.com/QZuGC10.jpg"},{name:"Lisa",age:20,img:"https://i.imgur.com/1EWwp59.jpg"},{name:"Sandra",age:18,img:"https://i.imgur.com/Lu3laIj.jpg"},{name:"Chloe",age:18,img:"https://i.imgur.com/WgYIxhw.png"},{name:"Alexa",age:23,img:"https://i.imgur.com/D0PQegY.png"},{name:"Maria",age:21,img:"https://i.imgur.com/eqd5IhH.jpg"},{name:"Emma",age:24,img:"https://i.imgur.com/4F9NXPo.png"},{name:"Sara",age:18,img:"http://i40.tinypic.com/ofxe21.jpg"},{name:"Lara",age:22,img:"https://i.imgur.com/HMkdN6A.jpg"}],a.stack=n.a.createRef(),a}return Object(p.a)(e,t),Object(l.a)(e,[{key:"like",value:function(){this.stack.current.like()}},{key:"nope",value:function(){this.stack.current.nope()}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(P,{ref:this.stack,people:this.people}),n.a.createElement("div",{className:"btn-group"},n.a.createElement(f.a,{onClick:this.like.bind(this),className:"btn",color:"secondary","aria-label":"add"},n.a.createElement(u.a,null)),n.a.createElement(f.a,{onClick:this.nope.bind(this),className:"btn",color:"primary","aria-label":"edit"},n.a.createElement(g.a,null))))}}]),e}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[27,1,2]]]);
//# sourceMappingURL=main.10c88c84.chunk.js.map