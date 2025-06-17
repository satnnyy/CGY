import RenderLibV2 from "../../RenderLibV2"



const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");

export function stop() {
    Player.getPlayer().func_70016_h(0, Player.getPlayer().field_70181_x, 0);
}

export function noWalk() {
    Client.scheduleTask(() => { KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), false) })
}

export function walk() {
    KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), true)
}

export function rotate(yaw, pitch) {
    const player = Player.getPlayer();

    player.field_70177_z = yaw;
    player.field_70125_A = pitch;
}

export function jump() {
    Client.scheduleTask(() => { KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74314_A.func_151463_i(), true) })
    Client.scheduleTask(2, () => { KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74314_A.func_151463_i(), false) })
}

export function edge() {
    edgeJump.register()
}

const mc = Client.getMinecraft().func_175598_ae()

export const edgeJump = register("renderOverlay", () => {
    let [x, y, z] = [mc.field_78730_l, mc.field_78731_m, mc.field_78728_n]
    let ID = World.getBlockAt(Player.getX(), Player.getY() - 0.1, Player.getZ()).type.getID()
    if (ID == 0) {
        jump()
        edgeJump.unregister()
    }
}).unregister()

const ringColors = new Map([
    ["jump", [1, 0, 1]],
    ["stop", [1, 0, 0]],
    ["boom", [0, 1, 1]],
    ["hclip", [0, 0, 0]],
    ["bonzo", [1, 1, 1]],
    ["look", [1, 0, 1]],
    ["vclip", [1, 1, 0]],
    ["block", [0, 0, 1]],
    ["edge", [1, 0, 1]],
    ["leap", [0, 0, 1]]
])

export function renderRings(x, y, z, w, type) {
    const [r, g, b] = ringColors.get(type)
    RenderLibV2.drawCyl(x, y, z, w / 2, w / 2, -0.01, 120, 1, 90, 0, 0, r, g, b, 1, false, true);
}

//stolen from trimone :3
export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

let alpha = 1
let shouldDescend = true
register("step", () => {
    if (shouldDescend) {
        alpha = alpha - 0.025
    } else {
        alpha = alpha + 0.025
    }
    if (alpha < 0.2) {
        shouldDescend = false
    }
    if (alpha > 0.4) {
        shouldDescend = true
    }
}).setFps(15)

export function renderBoxes(x, y, z, h, w, type) {
    const [r, g, b] = ringColors.get(type)
    for (let i = 0; i < h + 0.1; i += 0.5) {
        RenderLibV2.drawEspBoxV2(x, y + i + 0.01, z, w, 0, w, r, g, b, 1, false);
        RenderLibV2.drawInnerEspBoxV2(x, y + i + 0.01, z, w, 0, w, r, g, b, alpha, false);
    }
}




