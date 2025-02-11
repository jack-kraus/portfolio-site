import { Vector } from "../code/vector";
/*
		Needs:
		- Current X and Y
		- Offset of click from item corner
		- Speed X and Y (update each move, and keep on release with friction)
	*/
	class Orbitable {
		offset : Vector;
		speed : Vector;
		anchor : Vector;

		active : boolean;
		element : HTMLElement;

		timestamp : DOMHighResTimeStamp | null;
		animationRequest : number | null;

		constructor(inputElement : HTMLElement) {
			this.offset = new Vector(0, 0);
			this.speed = new Vector(10, 10);
			this.anchor = new Vector(0, 0);

			this.active = false;
			this.element = inputElement;

			this.timestamp = null;
			this.animationRequest = null;
			this.element.style.transform = `translate(900px, 450px) perspective(500px)`;
		}

		pickup(clientX : number, clientY : number) {
			const { top, left } = this.element.getBoundingClientRect();
			
			this.offset.set(clientX - left, clientY - top);
			
			this.speed.set(0, 0);
			this.active = true;

			if (this.animationRequest !== null) {
				cancelAnimationFrame(this.animationRequest);
			}

			this.animationRequest = null;
			this.timestamp = null;
		}

		move(clientX : number, clientY : number) {
			if (this.active) {
				
				const { top, left } = this.element.getBoundingClientRect();
				const { top:pTop, left:pLeft, right:pRight, bottom:pBottom } = this.element.parentElement?.getBoundingClientRect() ?? this.element.getBoundingClientRect();
				const newPos = new Vector(clientX, clientY);
				
				newPos.subtract(this.offset);
				const pCenter = new Vector((pLeft + pRight) / 2, (pBottom + pTop) / 2);
				newPos.subtract(pCenter);
				newPos.toLength(pCenter.y);
				newPos.add(pCenter);

				const newSpeed = new Vector(newPos.x - left, newPos.y - top);
				this.speed.lerpXY(newSpeed.x, newSpeed.y, 0.9);

				this.element.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
			}
		}

		release() {
			if (!this.active) return;
			this.active = false;

			const { top, left } = this.element.getBoundingClientRect();
			this.anchor.set(left, top);
			this.speed.clamp(100);

			this.animationRequest = requestAnimationFrame(this.animateStep.bind(this));
		}

		animateStep(timestamp : DOMHighResTimeStamp) {
			if (this.timestamp === null) {
				this.timestamp = timestamp;
			}

			let elapsed = timestamp - this.timestamp;
			
			const a = 5000;
			const b = 50;
			const t = elapsed / 1000;
			if(!this.active && this.speed.length() * b > a * t) {
				
				const ds = this.speed.length() * b * t - a * t * t / 2;
				const dsV = this.speed.copy();

				
				dsV.toLength(ds);

				this.element.style.transform = `translate(${this.anchor.x + dsV.x}px, ${this.anchor.y + dsV.y}px)`;

				this.animationRequest = requestAnimationFrame(this.animateStep.bind(this));
			}
			else {
				this.active = false;
			}
		}

		clamp(x : number, y : number) {


		}
	}

    const element = document.getElementById("orbitable");
	if (element) {
		const item = new Orbitable(element);
		element?.addEventListener("mousedown", (e) => {
			e.preventDefault();
			item.pickup(e.clientX, e.clientY);
		});
		document.addEventListener("mousemove", (e)=> {
			e.preventDefault();
			item.move(e.clientX, e.clientY);
		});
		document.addEventListener("mouseup", (e) => {
			e.preventDefault();
			item.release();
		});
	}