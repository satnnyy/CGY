import Settings from "../../config"
import fakeKeybinds from "../../utils/fakeKeybind"
import { lavaclip } from "../../utils/utils"

const S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook")
const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")

let delay = 0

let active = true

fakeKeybinds.onKeyPress("lavaVclipKeybind", () => { // what the fuck is this capitalization turtle
    if (!active) return
    active = false
    Client.scheduleTask(5, () => { active = true })
    lavaclip(30)
})

register("packetReceived", (packet) => {
    const x = Math.floor(packet.func_148932_c());
    const y = Math.floor(packet.func_148928_d());
    const z = Math.floor(packet.func_148933_e());

    if (Settings().bossClip && x == 73 && y == 221 && z == 14 && delay == 0) {
        delay = 10;
        Client.scheduleTask(0, () => Player.getPlayer().func_70107_b(Player.getX(), Player.getY() - 40, Player.getZ()))
    };
}).setFilteredClass(S08PacketPlayerPosLook);

register("packetReceived", () => {
    if (delay > 0) delay--;
}).setFilteredClass(S32PacketConfirmTransaction)