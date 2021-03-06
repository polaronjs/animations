import { Component, Host, h, State } from '@stencil/core';
import {
  trigger,
  animate,
  transition,
  style,
  query,
  stagger,
  animateChild,
  sequence,
} from '../lib';
import { AnimationNode } from '../lib/node';

const panel = trigger('panel', [
  transition(':enter', [
    style({ transform: 'translateX(-400px)' }),
    sequence([
      animate('350ms ease', style({ transform: 'translateX(0)' })),
      query('@banner', [animateChild()]),
      query(
        'li',
        [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger('45ms', [
            animate(
              '200ms ease',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ],
        { reverse: true }
      ),
    ]),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    query('li', [
      style({ opacity: 1, transform: 'translateX(0)' }),
      stagger('45ms', [
        animate(
          '200ms ease',
          style({ opacity: 0, transform: 'translateX(-100px)' })
        ),
      ]),
    ]),
    animate('200ms 100ms ease', style({ transform: 'translateX(-400px)' })),
  ]),
]);

const banner = trigger('banner', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('300ms ease', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('250ms ease', style({ opacity: 0, transform: 'scale(1.05)' })),
  ]),
]);

const onLoad = (node: AnimationNode) => {
  // node.currentTimeline.pause();
  // let time = 0;
  // setInterval(() => {
  //   node.seek(++time);
  // });
};

@Component({
  tag: 'app-root',
  styleUrl: 'app.css',
  shadow: true,
})
export class AppRoot {
  @State() showPanel: boolean = true;
  @State() showBanner: boolean = true;

  handleClick = () => {
    this.showPanel = !this.showPanel;
  };

  toggleBanner = () => {
    this.showBanner = !this.showBanner;
  };

  render() {
    return (
      <Host>
        <button onClick={this.handleClick}>toggle</button>
        <button class="panel__banner-toggle" onClick={this.toggleBanner}>
          Show banner
        </button>
        {this.showPanel && (
          <animation-container animation={panel} onAnimationLoad={onLoad}>
            <div class="panel">
              <div class="panel__inner">
                <ul>
                  <li onClick={this.handleClick}>some menu item</li>
                  <li onClick={this.handleClick}>some other menu item</li>
                  <li onClick={this.handleClick}>short item</li>
                  <li onClick={this.handleClick}>thing one</li>
                  <li onClick={this.handleClick}>blue fish</li>
                </ul>
                {this.showBanner && (
                  <animation-container animation={banner}>
                    <div class="banner">
                      An error occurred! Please try again later.
                    </div>
                  </animation-container>
                )}
              </div>
            </div>
          </animation-container>
        )}
      </Host>
    );
  }
}
