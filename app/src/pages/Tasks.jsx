import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserTasks } from '../http';

import coinImg from '../images/icons/coin.png';
import taskDefaultImg from '../images/tasks/gift.png';

export const Tasks = () => {
    const [tasks, setTasks] = useState([
        { name: 'Task 1', description: "description 1", logo: '', coins_reward: '1,000', penalty: true, status: "complete" },
        { name: 'Task 2', description: "description 2", logo: '', coins_reward: '2,000', penalty: true, status: "available" },
        { name: 'Task 3', description: "description 3", logo: '', coins_reward: '3,000', penalty: true, status: "lock" },
    ]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getUserTasks();
            if (tasksData) {
                setTasks(tasksData);
            }

            const completedTasks = tasks.filter(task => task.status === "complete");
            setCompletedTasksCount(completedTasks.length);
        };

        fetchTasks();
    }, []);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const totalTasksCount = tasks.length;

    return (
        <div className="tab">
            <div className="tab-container">
                <div className="tab-content">
                    <div className="tab-header">
                        <div className="tab-header-background task-header-background"></div>
                        <img src={coinImg} className="tab-img" draggable="false" />
                        <h2 className="tab-title">Easiest <img src={coinImg} className="coin-icon" alt="Coin-icon" /> in your life</h2>
                    </div>
                    <div className="task-section">
                        <div className="tab-block task-block">
                            <p className="tab-section-title">Common Tasks {completedTasksCount}/{totalTasksCount}</p>
                            {tasks.map((task, index) => (
                                <div className="task" key={index}>
                                    <div className="task-icon">
                                        <img src={task.icon ? task.icon : taskDefaultImg}/>
                                    </div>
                                    <div className="task-text">
                                        <div className="task-title">{task.name}</div>
                                        <div className="task-prize">{task.coins_reward}<img src={coinImg} className="coin-icon" alt="Coin-icon" /></div>
                                    </div>
                                    {task.status === "complete" ? (
                                        <div className="task-status">✔️</div>
                                    ) : task.status === "available" ? (
                                        <button className="tab-button-arrow" onClick={() => handleTaskClick(task)}>›</button>
                                    ) : (
                                        <div className="task-status">🔒</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="tab-block">
                            <div className="task-section-title">🥈SILVER LEAGUE</div>
                            <div>Coming soon</div>
                        </div>

                        <div className="tab-block">
                            <div className="task-section-title">🥇GOLD LEAGUE</div>
                            <div>Coming soon</div>
                        </div>

                        <div className="tab-block">
                            <div className="task-section-title">💎 DIAMOND LEAGUE</div>
                            <div>Coming soon</div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedTask && (
                <div className="modal">
                    <div className="modal-container">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-content">
                            <img src={selectedTask.logo || taskDefaultImg} className="modal-image" alt="Task icon" />
                            <div className="modal-info">
                                <h2 className='modal-title'>{selectedTask.name}</h2>
                                <p>{selectedTask.description}</p>
                                <p style={{ fontWeight: 'bold' }}>+ {selectedTask.coins_reward} <img src={coinImg} className="coin-icon" alt="Coin-icon" /></p>
                                {selectedTask.penalty && (
                                    <p style={{ color: '#FFA800' }}>⚠️ Leaving the channel will incur a x2 penalty</p>
                                )}
                            </div>
                            <button className='button-long button-purple modal-button' onClick={handleCloseModal}>Open task</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
