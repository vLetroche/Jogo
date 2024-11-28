/*const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#87CEEB",
    scene: {
        preload: preload,
        create: create
    }
};*/



class main extends Phaser.Scene {
    //python -m http.server
    //const game = new Phaser.Game(config);

    preload() {
        console.log('Carregando tileset');
        this.load.spritesheet('player_sp', 'Download2071.png', { frameWidth: 65, frameHeight: 65 });

        this.load.image('tileset', 'Terrain (32x32).png'); // Verifique o caminho e a image
        this.load.tilemapTiledJSON('map', 'mapa5.json'); // Verifique o caminho e o JSON
        

    }

    create() {
        const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        const tileset = map.addTilesetImage('Tileset_faseTeste', 'tileset');
        //tileset = map.addTilesetImage('tilset_decoracao', 'tileset');

        // Crie as camadas
        //this.groundLayer = this.map.createLayer('Chao', this.tileset, 0, 0);
        //this.wallsLayer = this.map.createLayer('Parede', this.tileset, 0, 0);
        this.wallsLayer = map.createDynamicLayer('Parede', tileset, 0, 0);
        this.groundLayer = map.createDynamicLayer('Chao', tileset, 0, 0);

         // criação do rei
         this.player = this.physics.add.sprite(150, 500, 'player_sp', 36);
         //this.player.setCollideWorldBounds(true);

         // criação da colisão
        this.wallsLayer.setCollisionBetween(20, 92, true);
        this.physics.add.collider(this.player, this.wallsLayer);



        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySPACE = this.input.keyboard.addKey('SPACE');

        // Animações do jogador para cada direção
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player_sp', { start: 30, end: 30 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player_sp', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_sp', { start: 12, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_sp', { start: 36, end: 36 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update ()
    {
        // velocidade horizontal
        if (this.keyD?.isDown) {
            this.player.setVelocityX(210);
            this.player.anims.play('right', true);
        }
        else if (this.keyA?.isDown) {
            this.player.setVelocityX(-210);
            this.player.anims.play('left', true);
        }
        else{
            this.player.setVelocityX(0); 
        }

        // velocidade vertical
        if (this.keyW.isDown) {
            this.player.setVelocityY(-210);
            this.player.anims.play('up', true);
        }
        else if (this.keyS.isDown) {
            this.player.setVelocityY(210);
            this.player.anims.play('down', true);
        }
        else{
            this.player.setVelocityY(0); 
        }


    }
}