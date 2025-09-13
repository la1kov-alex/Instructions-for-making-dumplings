import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const onPreviousStep = () => {
		if (!isFirstStep) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const onNextStep = () => {
		if (!isLastStep) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const onStartOver = () => {
		setActiveIndex(0);
	};

	const handleStepClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex]?.content || 'Контент не найден'}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							const isActive = index === activeIndex;
							const isCompleted = index < activeIndex;
							const isDisabled = index > activeIndex;

							const itemClasses = [
								styles['steps-item'],
								isActive ? styles.active : '',
								isCompleted ? styles.done : '',
								isDisabled ? styles.disabled : '',
							]
								.filter(Boolean)
								.join(' ');

							return (
								<li key={step.id} className={itemClasses}>
									<button
										className={styles['steps-item-button']}
										onClick={() => handleStepClick(index)}
										disabled={isDisabled}
									>
										{index + 1}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onPreviousStep}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? onStartOver : onNextStep}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
