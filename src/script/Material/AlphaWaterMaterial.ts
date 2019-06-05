export default class AlphaWaterMaterial extends Laya.BaseMaterial {
    public static ShaderName : string = "CustomWaterShader";

    public static MainTxture: number =  Laya.Shader3D.propertyNameToID("u_texture");
    public static Textue_ST: number = Laya.Shader3D.propertyNameToID("u_texturest");
    public static WaterColor: number = Laya.Shader3D.propertyNameToID("u_WaterColor");
    public static ColorPower:number = Laya.Shader3D.propertyNameToID("u_Power");
    public static DeepColor: number = Laya.Shader3D.propertyNameToID("u_DeepColor");
    
    public static WaveSpeed: number = Laya.Shader3D.propertyNameToID("u_WaveSpeed");
    public static WaveHeight: number = Laya.Shader3D.propertyNameToID("u_WaveHeight");
    public static WaveFrequency: number = Laya.Shader3D.propertyNameToID("u_WaveFrequency");

    public static UVWaveSpeed: number = Laya.Shader3D.propertyNameToID("u_UVWaveSpeed");
    public static UVWaveAmplitude: number = Laya.Shader3D.propertyNameToID("u_UVWaveAmplitude");
    public static UVWaveFrequency: number = Laya.Shader3D.propertyNameToID("u_UVWaveFrequency");

    public static Cull: number = Laya.Shader3D.propertyNameToID("s_Cull");
    public static Blend: number = Laya.Shader3D.propertyNameToID("s_Blend");
    public static BlendSrc: number = Laya.Shader3D.propertyNameToID("s_BlendSrc");

    public static BlendDst: number = Laya.Shader3D.propertyNameToID("s_BlendDst");
    public static DepthTest: number = Laya.Shader3D.propertyNameToID("s_DepthTest");
    public static DepthWrite: number = Laya.Shader3D.propertyNameToID("s_DepthWrite");

    private static isInitShader = false;
    public static InitShader()
    {
        if(AlphaWaterMaterial.isInitShader) return;
        AlphaWaterMaterial.isInitShader = true;
        var attributeMap:Object = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0, 
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0, 
            'a_Texcoord': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        };
        var uniformMap:Object = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE, 
            'u_texture': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_texturest': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaterColor': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_Power': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_DeepColor': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaveSpeed': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaveHeight': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_WaveFrequency': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_UVWaveSpeed': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_UVWaveAmplitude': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_UVWaveFrequency': Laya.Shader3D.PERIOD_MATERIAL, 
            'u_Time':Laya.Shader3D.PERIOD_SCENE,
        };

       var stateMap={
			's_Cull':Laya.Shader3D.RENDER_STATE_CULL,
			's_Blend':Laya.Shader3D.RENDER_STATE_BLEND,
            's_BlendSrc':Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            's_BlendDst':Laya.Shader3D.RENDER_STATE_BLEND_DST,
			's_DepthTest':Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
			's_DepthWrite':Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
		};
        var vs:string = `
        #include "Lighting.glsl";
        attribute vec4 a_Position;
        attribute vec2 a_Texcoord;
        attribute vec3 a_Normal;

        uniform mat4 u_MvpMatrix;
        uniform mat4 u_WorldMat;
        uniform vec4 u_texturest;

        uniform float u_WaveSpeed;
        uniform float u_WaveHeight;
        uniform float u_WaveFrequency;

        uniform float u_UVWaveSpeed;
        uniform float u_UVWaveFrequency;

        uniform float u_Time;

        varying vec2 v_Texcoord;
        //varying vec3 v_Normal;
        varying vec2 v_sinAni;

        void main()
        {
            vec3 worldpos =(u_WorldMat*a_Position).xyz;
            vec2 mainTexcoords = worldpos.xz * 0.1;
            v_Texcoord= mainTexcoords.xy * u_texturest.xy + u_texturest.zw;

            vec2 x = ((a_Position.xy+a_Position.yz) * u_UVWaveFrequency ) + (u_Time * u_UVWaveSpeed);
            v_sinAni = x;

            vec3 _pos = worldpos.xyz * u_WaveFrequency;
            float _phase = u_Time * u_WaveSpeed;
            vec4 vsw_offsets = vec4(1.0, 2.2, 0.6, 1.3);
			vec4 vsw_ph_offsets = vec4(1.0, 1.3, 2.2, 0.4);
			vec4 waveXZ = sin((_pos.xxzz * vsw_offsets) + (_phase * vsw_ph_offsets));

            float waveFactorX = dot(vec2(waveXZ.xy), vec2(1,1)) * u_WaveHeight * 0.5;
            float waveFactorZ = dot(vec2(waveXZ.zw), vec2(1,1)) * u_WaveHeight * 0.5;

            vec4 tpos = a_Position;
            tpos.y += (waveFactorX + waveFactorZ);

           // vec4 waveXZn = cos((_pos.xxzz * vsw_offsets) + (_phase * vsw_ph_offsets)) * (vsw_offsets * 0.5);
			//float xn = -u_WaveHeight * (waveXZn.x + waveXZn.y);
			//float zn = -u_WaveHeight * (waveXZn.z + waveXZn.w);
           // v_Normal = normalize(vec3(xn, 1, zn));

            gl_Position=u_MvpMatrix * tpos;
            gl_Position=remapGLPositionZ(gl_Position); 
        }`;
        var ps:string = `
        precision highp float;

        uniform sampler2D u_texture;
        uniform vec4 u_WaterColor;
        uniform float u_Power;
        uniform vec4 u_DeepColor;
        uniform float u_UVWaveAmplitude;

        varying vec2 v_Texcoord;
        varying vec2 v_sinAni;
       // varying vec3 v_Normal;

        void main()
        {
            vec2 t1 = sin(0.9 * v_sinAni.xy);
            vec2 t2 = sin(1.33 * v_sinAni.xy + 3.14);
            vec2 t3 = sin(2.4 * v_sinAni.xy + 5.3);
            vec2 uvDistort = (t1 + t2 + t3) * 0.33 * u_UVWaveAmplitude;
            vec2 texcood = v_Texcoord.xy +  uvDistort.xy;

            vec4 tex = texture2D(u_texture, texcood.xy);
            vec3 color = mix(u_DeepColor.rgb, u_WaterColor.rgb, vec3(tex.a)) * u_Power;
            vec4 c = tex;
            c.rgb = c.rgb * color.rgb;
            c.a = tex.a * u_WaterColor.a;
            gl_FragColor = c;
        }`;

        
        //创建自定义Shader
        var customShader:Laya.Shader3D = Laya.Shader3D.add(AlphaWaterMaterial.ShaderName);
        //为Shader添加SubShader
		var subShader:Laya.SubShader = new Laya.SubShader(attributeMap, uniformMap, Laya.SkinnedMeshSprite3D.shaderDefines);
        customShader.addSubShader(subShader);
        //为SubShader添加ShaderPass
        subShader.addShaderPass(vs,ps,stateMap);
    }
    
    constructor() {
        super()
        AlphaWaterMaterial.InitShader();
        this.setShaderName(AlphaWaterMaterial.ShaderName);
        this.renderQueue = 3000;
        this.alphaTest = false;
        this.depthWrite = false;
    }


    public get diffuseTexture(): Laya.BaseTexture {
        return this._shaderValues.getTexture(AlphaWaterMaterial.MainTxture);
    }

    public set diffuseTexture(value: Laya.BaseTexture) {
        this._shaderValues.setTexture(AlphaWaterMaterial.MainTxture,value);
    }

    public set Texture_ST(value: Laya.Vector4)  {
        this._shaderValues.setVector(AlphaWaterMaterial.Textue_ST, value);
    }
    
    public set waterColor(value: Laya.Vector4) {
        this._shaderValues.setVector(AlphaWaterMaterial.WaterColor, value);
    }
    public set colorPower(value: number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.ColorPower, value);
    }
    public set deepColor(value: Laya.Vector4) {
        this._shaderValues.setVector(AlphaWaterMaterial.DeepColor,value);
    }

    public set waveSpeed(value: number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.WaveSpeed, value);
    }
    public set waveHeight(value:number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.WaveHeight, value);
    }
    public set waveFrequency(value:number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.WaveFrequency, value);
    }
    
    public set uvWaveSpeed(value: number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.UVWaveSpeed, value);
    }
    public set uvWaveAmplitude(value:number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.UVWaveAmplitude, value);
    }
    public set uvWaveFrequency(value:number) {
        this._shaderValues.setNumber(AlphaWaterMaterial.UVWaveFrequency, value);
    }

    public set cull(value:number) {
        this._shaderValues.setInt(AlphaWaterMaterial.Cull, value);
    }
    public set blend(value:number) {
        this._shaderValues.setInt(AlphaWaterMaterial.Blend, value);
    }

    public set blendSrc(value:number) {
        this._shaderValues.setInt(AlphaWaterMaterial.BlendSrc, value);
    }

    public set blendDst(value:number) {
        this._shaderValues.setInt(AlphaWaterMaterial.BlendDst, value);
    }
    public set depthTest(value:number) {
        this._shaderValues.setInt(AlphaWaterMaterial.DepthTest, value);
    }
    public set depthWrite(value:boolean) {
        this._shaderValues.setBool(AlphaWaterMaterial.DepthWrite, value);
    }
}