const GRID_SIZE = 50;

export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

//CSS grid starts from 1So for the current game board we need everything 
//to be between 1 - 21
export function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}

export function goThroughWall(position) {
    if (position.x > GRID_SIZE) {
        return { x: 1, y: position.y }
    }
    if (position.x < 1) {
        return { x: GRID_SIZE, y: position.y }
    }
    if (position.y > GRID_SIZE) {
        return { x: position.x, y: 1 }
    }
    if (position.y < 1) {
        return { x: position.x, y: GRID_SIZE }
    }
}