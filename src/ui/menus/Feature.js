/**
 * Feature
 * A mithril component for displaying feature information.
 */
import m from 'mithril';
import PubSub from 'pubsub-js';
import {featureUpdate} from '../../topics';

import {mix} from '../../../mixwith.js/src/mixwith';
import {Menu} from './Menu';
import {RegisterComponentMixin} from '../RegisterComponentMixin';

export class FeatureMenu extends mix(Menu).with(RegisterComponentMixin) {

  /**
   *
   * @param vnode
   */

  oninit(vnode) {
    super.oninit(vnode);
    this.tagList = vnode.attrs.info.parent.parent.model.tags.sort();
    this.settings = vnode.attrs.info.parent.parent.model.qtlGroups[vnode.attrs.order];
    this.groupTags = vnode.attrs.info.tags;
    this.selected = {name: this.settings.filter, index: this.tagList.indexOf(this.settings.filter)};
  }

  /**
   * mithril component render method
   * @param vnode
   * @returns {*}
   */

  view(vnode) {
    //let info = vnode.attrs.info || {};
    //let order = vnode.attrs.order || 0;
    let bounds = vnode.attrs.bounds || {};
    let modal = this;
    modal.rootNode = vnode;

    return m('div', {
      class: 'feature-menu',
      style: `position:absolute; left: 0px; top: 0px; width:${bounds.width}px;height:${bounds.height}px`,
      onclick: function () {
        console.log('what', this);
      }
    }, [this._dropDown(modal), this._applyButton(modal), this._closeButton(modal)]);
  }

  /**
   *
   * @param modal
   * @returns {*}
   * @private
   */

  _applyButton(modal) {
    return m('button', {
      onclick: function () {
        console.log('what what', modal.settings);
        modal.settings.filter = modal.selected.name;
        modal.groupTags[0] = modal.selected.name;
        PubSub.publish(featureUpdate, null);
        modal.rootNode.dom.remove(modal.rootNode);
      }
    }, 'Apply Selection');
  }

  /**
   *
   * @param modal
   * @returns {*}
   * @private
   */

  _closeButton(modal) {
    return m('button', {
      onclick: function () {
        modal.rootNode.dom.remove(modal.rootNode);
      }
    }, 'Close');
  }

  /**
   *
   * @param modal
   * @returns {*}
   * @private
   */

  _dropDown(modal) {
    console.log('what inner', modal, modal.rootNode);
    let selector = this;
    return m('select', {
      selectedIndex: selector.selected.index,
      onchange: function (e) {
        console.log('selected on drop', this, e);
        selector.selected.name = e.target.value;
        selector.selected.index = modal.tagList.indexOf(e.target.value);
      }
    }, [modal.tagList.map(tag => {
      return m('option', tag);
    })
    ]);
  }

  /**
   *
   * @returns {boolean}
   */

  handleGesture() {
    // prevent interacting with div from propagating events
    return true;
  }
}
