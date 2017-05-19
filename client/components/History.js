import { browserHistory } from "react-router";

let history = [];

export function push(url) {
  console.log("going to ", url);
    history.push(url);
    browserHistory.push(url);
}

export function goBack() {
  console.log(`go back`);
  if (history.length) {
    history.pop();
    // console.log(`going back to ${history[history.length - 1]}`);
    browserHistory.goBack();
  }
}

export function getLength() {
  return history.length;
}

export function replace(url) {
  history.pop();
  history.push(url);
  browserHistory.replace(url);
}

export function getHistoryList(){
  return history;
}

export function returnTo(url, forcePush) {
  const index = history.slice().reverse().indexOf(url);
  if (index === -1) {
    if(forcePush){
      console.log("force return to ", url);
      push(url);
    }else {
      throw new Error(`Unable to find ${url} in history.`);
    }
  }else{
  history = history.slice(0, history.length - index);
  browserHistory.go(-index);
  }
}

export function currentUrl() {
  return history[history.length-1];
}

export function clear() {
  history = [];
}
