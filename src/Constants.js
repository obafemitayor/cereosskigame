export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
export const JUMPING_TIME = 150;
export const DIFFICULTY_TIME = 600;

export const CANTJUMPOBSTACLES = {
    "tree" : "tree",
    "treeCluster" : "treeCluster"
};

export const SKIERDIRECTION = {
    DIRECTION_LEFT : 0,
    DIRECTION_LEFT_DOWN : 1,
    DIRECTION_DOWN : 2,
    DIRECTION_RIGHT_DOWN : 3,
    DIRECTION_RIGHT : 4
};

export const IMAGE_NAMES = {
    SKIER_CRASH: 'skierCrash',
    SKIER_LEFT: 'skierLeft',
    SKIER_LEFTDOWN: 'skierLeftDown',
    SKIER_DOWN: 'skierDown',
    SKIER_RIGHTDOWN: 'skierRightDown',
    SKIER_RIGHT: 'skierRight',
    SKIER_JUMP1: 'skierJump1',
    SKIER_JUMP2: 'skierJump2',
    SKIER_JUMP3: 'skierJump3',
    SKIER_JUMP4: 'skierJump4',
    SKIER_JUMP5: 'skierJump5',
    TREE: 'tree',
    TREE_CLUSTER: 'treeCluster',
    ROCK1: 'rock1',
    JUMPRAMP: 'jumpRamp',
    ROCK2: 'rock2',
    RHINO: 'rhino',
    RHINO_RUN1: 'rhinoRun1',
    RHINO_RUN2: 'rhinoRun2',
    RHINO_EAT1: 'rhinoEat1',
    RHINO_EAT2: 'rhinoEat2',
    RHINO_EAT3: 'rhinoEat3',
    RHINO_EAT4: 'rhinoEat4',
    RHINO_CELEBRATE1: 'rhinoCelebrate1',
    RHINO_CELEBRATE2: 'rhinoCelebrate2'
};

export const IMAGES = [
    { name: IMAGE_NAMES.SKIER_CRASH, url: 'img/skier_crash.png' },
    { name: IMAGE_NAMES.SKIER_LEFT, url: 'img/skier_left.png' },
    { name: IMAGE_NAMES.SKIER_LEFTDOWN, url: 'img/skier_left_down.png' },
    { name: IMAGE_NAMES.SKIER_DOWN, url: 'img/skier_down.png' },
    { name: IMAGE_NAMES.SKIER_RIGHTDOWN, url: 'img/skier_right_down.png' },
    { name: IMAGE_NAMES.SKIER_RIGHT, url: 'img/skier_right.png' },
    { name: IMAGE_NAMES.SKIER_JUMP1, url: 'img/skier_jump_1.png' },
    { name: IMAGE_NAMES.SKIER_JUMP2, url: 'img/skier_jump_2.png' },
    { name: IMAGE_NAMES.SKIER_JUMP3, url: 'img/skier_jump_3.png' },
    { name: IMAGE_NAMES.SKIER_JUMP4, url: 'img/skier_jump_4.png' },
    { name: IMAGE_NAMES.SKIER_JUMP5, url: 'img/skier_jump_5.png' },
    { name: IMAGE_NAMES.TREE, url: 'img/tree_1.png' },
    { name: IMAGE_NAMES.TREE_CLUSTER, url: 'img/tree_cluster.png' },
    { name: IMAGE_NAMES.ROCK1, url: 'img/rock_1.png' },
    { name: IMAGE_NAMES.ROCK2, url: 'img/rock_2.png' },
    { name: IMAGE_NAMES.JUMPRAMP, url: 'img/jump_ramp.png' },
    { name: IMAGE_NAMES.RHINO, url: 'img/rhino_default.png' },
    { name: IMAGE_NAMES.RHINO_RUN1, url: 'img/rhino_run_left.png' },
    { name: IMAGE_NAMES.RHINO_RUN2, url: 'img/rhino_run_left_2.png' },
    { name: IMAGE_NAMES.RHINO_EAT1, url: 'img/rhino_eat_1.png' },
    { name: IMAGE_NAMES.RHINO_EAT2, url: 'img/rhino_eat_2.png' },
    { name: IMAGE_NAMES.RHINO_EAT3, url: 'img/rhino_eat_3.png' },
    { name: IMAGE_NAMES.RHINO_EAT4, url: 'img/rhino_eat_4.png' },
    { name: IMAGE_NAMES.RHINO_CELEBRATE1, url: 'img/rhino_celebrate_1.png' },
    { name: IMAGE_NAMES.RHINO_CELEBRATE2, url: 'img/rhino_celebrate_2.png' }
];

export const ANIMATION_FRAME_SPEED_MS = 250;
export const DIAGONAL_SPEED_REDUCER = 1.4142;