import { ProgressBlock } from './progress-block.js';

const block = new ProgressBlock(document.getElementById('progress__block'));
const input = document.getElementById('value-input');
const hideToggle = document.getElementById('hide-toggle');
const animateToggle = document.getElementById('animate-toggle');

input.addEventListener('input', (e) => {
  const val = e.target.valueAsNumber;
  if (e.target.value === '' || Number.isNaN(val)) {
    block.setValue(0);
    return;
  }
  block.setValue(val);
});

hideToggle.addEventListener('change', (e) => {
  e.target.checked ? block.hide() : block.show();
});

animateToggle.addEventListener('change', (e) => {
  e.target.checked ? block.startAnimation() : block.stopAnimation();
});
