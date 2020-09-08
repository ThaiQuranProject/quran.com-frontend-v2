// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="word">
// </div>

import { Controller } from "stimulus";
import Tooltip from "bootstrap/js/src/tooltip";

export default class extends Controller {
  connect() {
    let el = this.element;
    const dataset = el.dataset;
    let setting = document.body.setting;

    el.tooltip = new Tooltip(el, {
      trigger: "hover",
      placement: "top",
      html: true,
      template:
        "<div class='tooltip bs-tooltip-top' role='tooltip'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>",
      title: function(w) {
        const local = dataset.local;
        const tooltip = setting.getTooltipType();
        const text = dataset[tooltip];
        return `<div class='${local}'>${text}</div>`;
      }
    });

    el.addEventListener("dblclick", e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.dbClick(e);
    });

    el.addEventListener("click", e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.play();
    });

    this.el = el;
  }

  play() {
    let data = this.element.dataset;
    GoogleAnalytic.trackEvent("Play Word", "Play", data.key, 1);

    let player,
      playerDom = document.getElementById("player");

    if (playerDom) player = playerDom.player;
    if (player) {
      return player.playWord(data.audio);
    }
  }

  dbClick() {
    let player,
      playerDom = document.getElementById("player");

    if (playerDom) player = playerDom.player;
    if (player) {
      return player.seekToWord(this.el.dataset.position);
    }
  }

  disconnect() {
    this.el.removeEventListener("click", () => {});
    this.el.removeEventListener("dblclick", () => {});
    this.el.removeEventListener("dispose", () => {});
  }
}
