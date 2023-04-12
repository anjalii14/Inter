import React, { useState } from "react";
import image from "../assets/Group-5674.png";
import ImgUpload from "../components/ImgUpload";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiUpload, FiX } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { message } from "antd";
import { Select } from "antd";

const { Option } = Select;
const schema = yup.object().shape({
	name: yup.string().required(),
	collegeName: yup.string().required(),
	branch: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(4).max(15).required(),
});

function Signup() {
	const [tags, setTags] = useState([]);

	const test = () => {
		alert("yo");
	};
	function handleTagChange(newTags) {
		setTags(newTags);
	}

	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
		console.log(event.target.files[0]);
	};

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	const submitForm = async (data) => {
		try {
			data = { ...data, pfp: selectedFile, interests: tags };
			const formData = new FormData();
			for (let key in data) {
				formData.append(key, data[key]);
			}
			// console.log(data);
			const response = await fetch("http://localhost:3001/auth/register", {
				method: "POST",
				body: formData,
			});
			const result = await response.json();
			console.log(result);
			
			if(result.status === 200)
			message.success("User account created!");
		} catch (error) {
			message.error("Something went wrong");
			console.log(data);
			console.error(error);
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-100 to-white-400">
			<Navbar />

			<div className="block lg:flex items-center justify-center min-h-[80vh] lg:justify-evenly overflow-y-hidden">
				<div className="block lg:flex flex-col mt-20  ">
					{/* headings and subheadings */}
					<div className="ml-0 lg:-ml-16">
						<h1 className="text-4xl text-center lg:text-left lg:text-[2.9rem] tracking-wide leading-snug text-[#4875f9]  italic font-[670] ">
							Welcome to our <br /> Community
						</h1>
						<h2 className="text-center lg:text-left lg:text-lg font-[500] text-gray-500 mt-2 mb-6 whitespace-pre-line">
							A whole new productive journey <br /> starts right here!
						</h2>
					</div>

					{/* image */}
					<div className="relative">
						<img
							className="w-[60%] lg:w-[80%] mt-10 mr-auto ml-auto lg:ml-32 lg:mt-[-4rem] transform -rotate-[20deg]"
							src={image}
							alt="Login Image"
						/>
					</div>
				</div>

				{/* form begins here */}

				<form
					onSubmit={handleSubmit(submitForm)}
					className="flex lg:h-20 scale-90 flex-col gap-4 w-[340px] lg:w-[550px] lg:mt-[7.25rem] ml-auto mr-auto lg:ml-0 justify-center mb-4 lg:mr-0"
					style={{ transform: "scale(0.78)" }}
				>
					<div className="flex lg:w-[auto] gap-4 justify-between">
						<div className="flex flex-col w-full">
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Name"
								className="w-full px-4 py-3 bg-[#dfe6f9] border-gray-300 rounded-lg"
								{...register("name", { required: true })}
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<input
							type="text"
							id="collegeName"
							name="collegeName"
							placeholder="College Name"
							className="w-full px-4 py-3 bg-[#dfe6f9] border-gray-300 rounded-lg"
							{...register("collegeName", { required: true })}
						/>
					</div>
					<div className="flex flex-col">
						<input
							type="text"
							id="branch"
							name="branch"
							placeholder="Branch"
							className="w-full px-4 py-3 bg-[#dfe6f9] border-gray-300 rounded-lg"
							{...register("branch", { required: true })}
						/>
					</div>

					<div className="w-full mx-auto">
						<div className="flex flex-col items-center py-2">
							<label className="flex flex-col items-center w-full px-4 py-6 bg-[#dfe6f9] text-blue rounded-lg tracking-wide uppercase cursor-pointer hover:bg-blue">
								<FiUpload className="w-8 h-8 text-gray-500" />
								<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span class="font-semibold">Click to upload</span>
								</p>
								<p class="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
								<input
									type="file"
									className="hidden"
									name="pfp"
									{...register("pfp", { required: false })}
									onChange={handleFileChange}
									accept="image/*"
								/>
							</label>
							{selectedFile && (
								<div className="mt-4 flex items-center justify-between w-full px-4 py-2 bg-[#dfe6f9] rounded-md">
									<p className="text-sm text-gray-500 truncate">
										{selectedFile.name}
									</p>
									<button
										onClick={() => setSelectedFile(null)}
										className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
									>
										<FiX className="w-6 h-6" />
									</button>
								</div>
							)}
						</div>
					</div>

					{/* <div className="flex flex-col">
						<label class="block">
							<span class="sr-only">Choose profile photo</span>
							<input
								type="file"
								className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
								name="pfp"
								{...register("pfp", { required: false })}
								onChange={handleFileChange}
								accept="image/*"
							/>
						</label>
					</div> */}

					<div className="flex flex-col">
						<Select
							mode="tags"
							placeholder="Enter your interests"
							onChange={handleTagChange}
							value={tags}
							style={{ width: "100%" }}
						>
							<Option key="Web Development">Web Development</Option>
							<Option key="App Development">App Development</Option>
							<Option key="AI ML">AI ML</Option>
							<Option key="Design">Design</Option>
						</Select>
					</div>

					<div className="flex flex-col">
						<input
							type="text"
							placeholder="Enter your email address"
							name="email"
							className="w-full px-4 py-3 bg-[#dfe6f9] border-gray-300 rounded-lg"
							{...register("email", { required: true })}
						/>
					</div>

					<div className="flex flex-col relative">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Set a password"
							name="password"
							className="w-full px-4 py-3 bg-[#dfe6f9] border border-gray-300 rounded-lg pr-10"
							{...register("password", { required: true })}
						/>
						<button
							className="absolute top-1/2 transform -translate-y-1/2 right-7"
							onClick={handleTogglePassword}
						>
							{showPassword ? (
								<FaEyeSlash className="text-gray-600" />
							) : (
								<FaEye className="text-gray-600" />
							)}
						</button>
					</div>

					<button
						// onClick={test}
						type="submit"
						className="w-full mt-2 px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg"
					>
						Create Account
					</button>

					<p className="text-left -mt-1 text-gray-500">
						Already have an account?{" "}
						<a href="#" className="text-blue-500">
							<Link to="/login">Sign in</Link>
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signup;
