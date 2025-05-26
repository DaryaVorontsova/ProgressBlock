export class ProgressBlock {
  constructor(root) {
    this.root = root;
    this.mainCircle = root.querySelector('.progress__main');
    this.wrapper = this.root;
    this.svgContainer = root.querySelector('.progress__svg');

    const radius = this.mainCircle.r.baseVal.value;
    this.circumference = 2 * Math.PI * radius;

    this.mainCircle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.mainCircle.style.strokeDashoffset = this.circumference;
    this.setValue(0);

    this.baseAngle = -90;
    this.rotation = 0;
    this.rafId = null;
  }

  setValue(value) {
    if (typeof value !== 'number' || isNaN(value)) return;

    const percent = Math.max(0, Math.min(100, Number(value)));
    const offset = this.circumference - (percent / 100) * this.circumference;
    this.mainCircle.style.strokeDashoffset = offset;
  }

  show() {
    this.wrapper.classList.remove('hidden');
  }

  hide() {
    this.wrapper.classList.add('hidden');
  }

  startAnimation() {
    if (this.rafId) return;

    const step = () => {
      this.rotation = (this.rotation + 2) % 360;
      this.svgContainer.style.transform = `rotate(${this.baseAngle + this.rotation}deg)`;
      this.rafId = requestAnimationFrame(step);
    };
    step();
  }

  stopAnimation() {
    if (!this.rafId) return;
    cancelAnimationFrame(this.rafId);
    this.rafId = null;

    const startRot = this.rotation;
    const delta = (360 - startRot) % 360;
    const duration = 300;
    const t0 = performance.now();

    const back = (t) => {
      const elapsed = t - t0;
      const p = Math.min(elapsed / duration, 1);
      const ease = p * (2 - p);
      const current = startRot + delta * ease;
      this.svgContainer.style.transform = `rotate(${this.baseAngle + current}deg)`;

      if (p < 1) {
        requestAnimationFrame(back);
      } else {
        this.rotation = 0;
        this.svgContainer.style.transform = `rotate(${this.baseAngle}deg)`;
      }
    };

    requestAnimationFrame(back);
  }
}
